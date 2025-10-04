import Pusher from 'pusher'
import PusherClient from 'pusher-js'

// Configuration Pusher côté serveur
export const pusherServer = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})

// Configuration Pusher côté client
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    forceTLS: true,
    authEndpoint: '/api/pusher',
    auth: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  }
)

// Types pour les événements Pusher
export interface PusherMessage {
  id: string
  content: string
  senderId: string
  recipientId: string
  createdAt: string
  fileUrl?: string
  fileName?: string
  fileType?: string
}

// Noms des canaux et événements
export const PUSHER_EVENTS = {
  NEW_MESSAGE: 'new-message',
  MESSAGE_READ: 'message-read',
  USER_STATUS_UPDATED: 'user-status-updated',
} as const

// Canaux globaux
export const PUSHER_CHANNELS = {
  USER_STATUS: 'user-status',
} as const

// Fonction utilitaire pour générer le nom du canal de chat
export const getChatChannelName = (userId1: string, userId2: string): string => {
  // Trier les IDs pour assurer la cohérence du nom du canal
  const sortedIds = [userId1, userId2].sort()
  return `chat-${sortedIds[0]}-${sortedIds[1]}`
}
