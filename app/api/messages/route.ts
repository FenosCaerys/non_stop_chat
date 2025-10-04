import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { pusherServer, getChatChannelName, PUSHER_EVENTS } from "@/lib/pusher"
import { z } from "zod"

// Schéma de validation pour la création de message
const messageSchema = z.object({
  content: z.string().min(1, "Le contenu du message est requis"),
  recipientId: z.string().uuid("ID de destinataire invalide"),
  // Champs optionnels pour les pièces jointes
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
  fileSize: z.number().optional(),
  publicId: z.string().optional(),
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

    const { content, recipientId, fileUrl, fileName, fileType, fileSize, publicId } = validationResult.data

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

    // Créer le message avec Prisma
    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        recipientId,
        // Champs pour les pièces jointes (optionnels)
        fileUrl,
        fileName,
        fileType,
        fileSize,
        publicId,
        // Le champ isRead sera automatiquement défini à false grâce au @default(false) dans le schéma
      },
    })
    
    // Utiliser le message créé par Prisma pour la réponse
    const messageData = {
      ...message,
      // Ajouter explicitement les propriétés pour éviter les erreurs TypeScript
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      recipientId: message.recipientId,
      createdAt: message.createdAt
    }

    // Déclencher l'événement Pusher pour la messagerie en temps réel
    try {
      const channelName = getChatChannelName(session.user.id, recipientId)
      await pusherServer.trigger(channelName, PUSHER_EVENTS.NEW_MESSAGE, messageData)
    } catch (pusherError) {
      console.error("Erreur lors de l'envoi via Pusher:", pusherError)
      // Ne pas faire échouer la requête si Pusher échoue
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
