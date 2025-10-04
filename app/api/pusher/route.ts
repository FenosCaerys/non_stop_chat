import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { pusherServer } from "@/lib/pusher"

// Route pour l'authentification Pusher
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const body = await request.text()
    const params = new URLSearchParams(body)
    
    const socketId = params.get('socket_id')
    const channelName = params.get('channel_name')

    if (!socketId || !channelName) {
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur peut accéder à ce canal
    // Format du canal: chat-userId1-userId2
    const channelParts = channelName.split('-')
    if (channelParts.length !== 3 || channelParts[0] !== 'chat') {
      return NextResponse.json(
        { message: "Canal invalide" },
        { status: 403 }
      )
    }

    const userId1 = channelParts[1]
    const userId2 = channelParts[2]
    
    // L'utilisateur doit être l'un des participants du chat
    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return NextResponse.json(
        { message: "Accès non autorisé à ce canal" },
        { status: 403 }
      )
    }

    // Authentifier l'utilisateur pour ce canal
    const authResponse = pusherServer.authorizeChannel(socketId, channelName, {
      user_id: session.user.id,
      user_info: {
        name: `${session.user.firstName} ${session.user.lastName}`,
        email: session.user.email
      }
    })

    return NextResponse.json(authResponse)
  } catch (error) {
    console.error("Erreur lors de l'authentification Pusher:", error)
    return NextResponse.json(
      { message: "Erreur d'authentification" },
      { status: 500 }
    )
  }
}