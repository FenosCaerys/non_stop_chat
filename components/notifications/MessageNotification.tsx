'use client'

import { useEffect, useState } from 'react'
import { pusherClient, getChatChannelName, PUSHER_EVENTS, PusherMessage } from '@/lib/pusher'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { X } from 'lucide-react'

interface NotificationData {
  id: string
  message: string
  senderName: string
  senderId: string
  timestamp: Date
}

export default function MessageNotification() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  useEffect(() => {
    if (!session?.user?.id) return

    // S'abonner aux notifications de tous les chats de l'utilisateur
    const channels: any[] = []

    const handleNewMessage = (data: PusherMessage) => {
      // Ne pas afficher de notification si on est déjà sur la page de chat avec cet utilisateur
      const currentChatUserId = pathname.split('/chat/')[1]
      if (currentChatUserId === data.senderId) return

      // Ne pas afficher de notification pour ses propres messages
      if (data.senderId === session.user.id) return

      const notification: NotificationData = {
        id: data.id,
        message: data.content.length > 50 ? data.content.substring(0, 50) + '...' : data.content,
        senderName: `Utilisateur ${data.senderId}`, // On pourrait récupérer le vrai nom
        senderId: data.senderId,
        timestamp: new Date()
      }

      setNotifications(prev => [...prev, notification])

      // Supprimer automatiquement la notification après 5 secondes
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 5000)

      // Notification du navigateur si supportée
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nouveau message', {
          body: `${notification.senderName}: ${notification.message}`,
          icon: '/favicon.ico'
        })
      }
    }

    // Cette approche simplifiée écoute un canal global pour les notifications
    // Dans une vraie application, on s'abonnerait aux canaux spécifiques
    const globalChannel = pusherClient.subscribe('user-notifications-' + session.user.id)
    globalChannel.bind(PUSHER_EVENTS.NEW_MESSAGE, handleNewMessage)

    return () => {
      globalChannel.unbind(PUSHER_EVENTS.NEW_MESSAGE, handleNewMessage)
      pusherClient.unsubscribe('user-notifications-' + session.user.id)
    }
  }, [session?.user?.id, pathname])

  // Demander la permission pour les notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const handleNotificationClick = (senderId: string) => {
    router.push(`/chat/${senderId}`)
    setNotifications(prev => prev.filter(n => n.senderId !== senderId))
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleNotificationClick(notification.senderId)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900">
                {notification.senderName}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                dismissNotification(notification.id)
              }}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
