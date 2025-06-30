import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { z } from "zod"

// Schéma de validation pour la création de message
const messageSchema = z.object({
  content: z.string().min(1, "Le contenu du message est requis"),
  recipientId: z.string().uuid("ID de destinataire invalide"),
})

export async function POST(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Valider les données du message
    const body = await request.json()
    const validationResult = messageSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: validationResult.error.format() },
        { status: 400 }
      )
    }

    const { content, recipientId } = validationResult.data

    // Vérifier si le destinataire existe
    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    })

    if (!recipient) {
      return NextResponse.json(
        { message: "Destinataire non trouvé" },
        { status: 404 }
      )
    }

    // Créer le message
    // Comme le client Prisma n'a pas été régénéré, nous utilisons une requête SQL directe
    await prisma.$executeRaw`
      INSERT INTO messages (id, content, sender_id, recipient_id, is_read, created_at)
      VALUES (uuid_generate_v4(), ${content}, ${session.user.id}, ${recipientId}, false, NOW())
    `
    
    // Créer un objet message pour la réponse
    const messageData = {
      id: 'temp-id', // ID temporaire
      content,
      senderId: session.user.id,
      recipientId,
      createdAt: new Date(),
      isRead: false
    }

    return NextResponse.json(
      { message: "Message envoyé avec succès", data: messageData },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Récupérer l'ID du destinataire depuis les paramètres de requête
    const { searchParams } = new URL(request.url)
    const recipientId = searchParams.get('recipientId')

    if (!recipientId) {
      return NextResponse.json(
        { message: "ID du destinataire requis" },
        { status: 400 }
      )
    }

    // Récupérer les messages entre l'utilisateur actuel et le destinataire
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id, recipientId },
          { senderId: recipientId, recipientId: session.user.id },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la récupération des messages" },
      { status: 500 }
    )
  }
}
