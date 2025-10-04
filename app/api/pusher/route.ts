import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { pusherServer, getChatChannelName, PUSHER_EVENTS } from "@/lib/pusher"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { event, channel, data } = await request.json()

    // Valider les paramètres requis
    if (!event || !channel || !data) {
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 }
      )
    }

    // Déclencher l'événement Pusher
    await pusherServer.trigger(channel, event, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur Pusher:", error)
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'événement" },
      { status: 500 }
    )
  }
}

// Endpoint pour l'authentification des canaux privés (si nécessaire)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const socketId = searchParams.get('socket_id')
    const channel = searchParams.get('channel_name')

    if (!socketId || !channel) {
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur a accès au canal
    const userId = session.user.id
    if (!channel.includes(userId)) {
      return NextResponse.json(
        { message: "Accès refusé au canal" },
        { status: 403 }
      )
    }

    const auth = pusherServer.authenticate(socketId, channel)
    return NextResponse.json(auth)
  } catch (error) {
    console.error("Erreur d'authentification Pusher:", error)
    return NextResponse.json(
      { message: "Erreur d'authentification" },
      { status: 500 }
    )
  }
}
