import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { pusherServer, PUSHER_EVENTS, PUSHER_CHANNELS } from "@/lib/pusher"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Vérifier que l'utilisateur peut modifier son propre statut
    if (session.user.id !== params.id) {
      return NextResponse.json(
        { message: "Vous ne pouvez modifier que votre propre statut" },
        { status: 403 }
      )
    }

    const { status } = await request.json()

    // Valider le statut
    if (!status || !['online', 'offline'].includes(status)) {
      return NextResponse.json(
        { message: "Statut invalide. Doit être 'online' ou 'offline'" },
        { status: 400 }
      )
    }

    // Mettre à jour le statut
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { status },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        status: true,
      }
    })

    console.log(`📊 Statut mis à jour: ${updatedUser.firstName} ${updatedUser.lastName} -> ${status}`)

    // Déclencher l'événement Pusher pour notifier les autres utilisateurs
    try {
      await pusherServer.trigger(
        PUSHER_CHANNELS.USER_STATUS,
        PUSHER_EVENTS.USER_STATUS_UPDATED,
        {
          userId: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          status: updatedUser.status,
          timestamp: new Date().toISOString()
        }
      )
    } catch (pusherError) {
      console.error("Erreur lors de l'envoi via Pusher:", pusherError)
      // Ne pas faire échouer la requête si Pusher échoue
    }

    return NextResponse.json({
      message: "Statut mis à jour avec succès",
      user: updatedUser
    })

  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}