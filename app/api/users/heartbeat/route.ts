import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { pusherServer, PUSHER_EVENTS, PUSHER_CHANNELS } from "@/lib/pusher"

// Route pour maintenir le statut "online" des utilisateurs actifs
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    console.log('Session dans /api/users/heartbeat:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    })
    
    if (!session?.user) {
      console.log('❌ Accès refusé - Pas de session utilisateur dans heartbeat')
      return NextResponse.json(
        { message: "Non autorisé - Veuillez vous connecter" },
        { status: 401 }
      )
    }

    // Mettre à jour le timestamp de dernière activité
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        status: 'online',
        updatedAt: new Date()
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        status: true,
      }
    })

    return NextResponse.json({
      message: "Heartbeat enregistré",
      user: updatedUser
    })

  } catch (error) {
    console.error("Erreur lors du heartbeat:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

// Route pour marquer les utilisateurs inactifs comme "offline"
export async function GET(request: NextRequest) {
  try {
    // Marquer comme offline les utilisateurs qui n'ont pas été actifs depuis 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    const inactiveUsers = await prisma.user.findMany({
      where: {
        status: 'online',
        updatedAt: {
          lt: fiveMinutesAgo
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      }
    })

    if (inactiveUsers.length > 0) {
      // Mettre à jour le statut des utilisateurs inactifs
      await prisma.user.updateMany({
        where: {
          id: {
            in: inactiveUsers.map(user => user.id)
          }
        },
        data: {
          status: 'offline'
        }
      })

      // Notifier via Pusher pour chaque utilisateur
      for (const user of inactiveUsers) {
        try {
          await pusherServer.trigger(
            PUSHER_CHANNELS.USER_STATUS,
            PUSHER_EVENTS.USER_STATUS_UPDATED,
            {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              status: 'offline',
              timestamp: new Date().toISOString()
            }
          )
        } catch (pusherError) {
          console.error("Erreur lors de l'envoi via Pusher:", pusherError)
        }
      }

      console.log(`📴 ${inactiveUsers.length} utilisateurs marqués comme offline`)
    }

    return NextResponse.json({
      message: "Vérification des utilisateurs inactifs terminée",
      inactiveCount: inactiveUsers.length
    })

  } catch (error) {
    console.error("Erreur lors de la vérification des utilisateurs inactifs:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
