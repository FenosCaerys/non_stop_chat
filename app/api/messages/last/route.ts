import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

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

    // Récupérer les derniers messages pour chaque conversation de l'utilisateur
    const lastMessages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { recipientId: session.user.id },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          }
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Grouper par conversation et garder seulement le dernier message
    const conversationsMap = new Map()
    
    lastMessages.forEach(message => {
      const otherUserId = message.senderId === session.user.id 
        ? message.recipientId 
        : message.senderId
      
      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          ...message,
          otherUser: message.senderId === session.user.id 
            ? message.recipient 
            : message.sender
        })
      }
    })

    const conversations = Array.from(conversationsMap.values())

    return NextResponse.json({ 
      conversations,
      lastMessages: conversations // Pour compatibilité avec le frontend
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des derniers messages:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la récupération des derniers messages" },
      { status: 500 }
    )
  }
}