'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { pusherClient, getChatChannelName, PUSHER_EVENTS, PusherMessage } from '@/lib/pusher'
import { Channel } from 'pusher-js'
import MessageAttachment from './MessageAttachment'
import UserAvatar from '@/components/ui/UserAvatar'

interface Message {
  id: string
  content: string
  senderId: string
  recipientId: string
  createdAt: string
  fileUrl?: string
  fileName?: string
  fileType?: string
  fileSize?: number
}

interface ChatBoxProps {
  currentUserId: string
  recipientId: string
  recipientImage: string
  recipientName?: string
}

export default React.forwardRef(function ChatBox(
  { currentUserId, recipientId, recipientImage, recipientName }: ChatBoxProps,
  ref: React.ForwardedRef<{fetchLatestMessages: () => Promise<void>}>
) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [channel, setChannel] = useState<Channel | null>(null)

  useEffect(() => {
    // Récupérer l'historique des messages
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/messages?recipientId=${recipientId}`)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des messages')
        }
        
        const data = await response.json()
        setMessages(data.messages)
        
        // Marquer les messages comme lus
        markMessagesAsRead()
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setIsLoading(false)
        scrollToBottom()
      }
    }

    fetchMessages()
  }, [recipientId])
  
  // Fonction pour marquer les messages comme lus
  const markMessagesAsRead = async () => {
    try {
      const response = await fetch('/api/messages/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: recipientId
        }),
      })
      
      if (!response.ok) {
        console.error('Erreur lors du marquage des messages comme lus')
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  useEffect(() => {
    // Configurer Pusher pour écouter les nouveaux messages
    const channelName = getChatChannelName(currentUserId, recipientId)
    const pusherChannel = pusherClient.subscribe(channelName)
    setChannel(pusherChannel)

    const handleNewMessage = (data: PusherMessage) => {
      console.log('Nouveau message reçu via Pusher:', data)
      
      // Ajouter le message directement au state au lieu de refetch
      const newMessage: Message = {
        id: data.id,
        content: data.content,
        senderId: data.senderId,
        recipientId: data.recipientId,
        createdAt: data.createdAt,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileType: data.fileType
      }
      
      setMessages(prevMessages => {
        // Éviter les doublons
        const messageExists = prevMessages.some(msg => msg.id === newMessage.id)
        if (messageExists) {
          return prevMessages
        }
        return [...prevMessages, newMessage]
      })
      
      // Si le message vient du destinataire, le marquer comme lu
      if (data.senderId === recipientId) {
        markMessagesAsRead()
      }
    }

    pusherChannel.bind(PUSHER_EVENTS.NEW_MESSAGE, handleNewMessage)

    return () => {
      pusherChannel.unbind(PUSHER_EVENTS.NEW_MESSAGE, handleNewMessage)
      pusherClient.unsubscribe(channelName)
    }
  }, [recipientId, currentUserId])
  
  // Défiler vers le bas lorsque les messages changent
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages])

  const fetchLatestMessages = async () => {
    try {
      const response = await fetch(`/api/messages?recipientId=${recipientId}`, {
        cache: 'no-store', // Forcer le rechargement
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des messages')
      }
      
      const data = await response.json()
      
      // Mettre à jour seulement si les messages ont changé
      setMessages(prevMessages => {
        if (JSON.stringify(prevMessages) !== JSON.stringify(data.messages)) {
          return data.messages
        }
        return prevMessages
      })
      
      // Toujours défiler vers le bas après avoir reçu de nouveaux messages
      // Utiliser setTimeout pour s'assurer que le DOM est mis à jour avant de défiler
      setTimeout(() => {
        scrollToBottom()
      }, 50)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }
  
  // Exposer la méthode fetchLatestMessages via la référence
  React.useImperativeHandle(ref, () => ({
    fetchLatestMessages: async () => {
      await fetchLatestMessages();
      // Force le défilement après l'envoi d'un message
      setTimeout(() => {
        scrollToBottom();
      }, 200); // Délai plus long pour s'assurer que le DOM est complètement mis à jour
    }
  }));

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }

  const handleMouseEnter = () => {
    setIsActive(true)
  }

  const handleMouseLeave = () => {
    setIsActive(false)
    scrollToBottom()
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Aucun message. Commencez la conversation !</p>
      </div>
    )
  }

  return (
    <div 
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`mb-4 ${message.senderId === currentUserId ? 'flex justify-end' : 'flex'}`}
        >
          {message.senderId !== currentUserId && (
            <div className="mr-2 flex-shrink-0">
              <UserAvatar
                src={recipientImage}
                alt={recipientName || "Avatar"}
                size="sm"
              />
            </div>
          )}
          <div 
            className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
              message.senderId === currentUserId 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}
          >
            {message.content && <p>{message.content}</p>}
            
            {/* Affichage des pièces jointes */}
            {message.fileUrl && message.fileName && message.fileType && (
              <MessageAttachment
                fileUrl={message.fileUrl}
                fileName={message.fileName}
                fileType={message.fileType}
                fileSize={message.fileSize}
              />
            )}
            
            <span className={`text-xs block mt-1 ${
              message.senderId === currentUserId ? 'text-gray-200' : 'text-gray-500'
            }`}>
              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
})
