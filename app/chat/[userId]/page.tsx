'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ChatBox from '@/components/chat/ChatBox'
import { User } from '@prisma/client'
import { io, Socket } from 'socket.io-client'

interface ChatPageProps {
  params: {
    userId: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [recipient, setRecipient] = useState<User | null>(null)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    // Récupérer les informations de l'utilisateur destinataire
    const fetchRecipient = async () => {
      try {
        const response = await fetch(`/api/users/${params.userId}`)
        
        if (!response.ok) {
          throw new Error('Utilisateur non trouvé')
        }
        
        const data = await response.json()
        setRecipient(data.user)
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error)
        router.push('/users')
      }
    }

    if (params.userId) {
      fetchRecipient()
    }
  }, [params.userId, router])

  useEffect(() => {
    // Initialiser la connexion Socket.io
    if (session?.user?.id && recipient) {
      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        query: {
          userId: session.user.id
        }
      })

      socketInstance.on('connect', () => {
        setIsConnected(true)
        console.log('Connected to socket server')
      })

      socketInstance.on('disconnect', () => {
        setIsConnected(false)
        console.log('Disconnected from socket server')
      })

      setSocket(socketInstance)

      return () => {
        socketInstance.disconnect()
      }
    }
  }, [session?.user?.id, recipient])

  // Référence au composant ChatBox pour pouvoir appeler ses méthodes
  const chatBoxRef = React.useRef<{fetchLatestMessages: () => Promise<void>}>(null);
  
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim() || !session?.user?.id || !recipient?.id) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          recipientId: recipient.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message')
      }

      // Récupérer les données du message créé
      const messageData = await response.json();
      
      // Émettre l'événement de nouveau message via socket.io
      if (socket && isConnected) {
        socket.emit('new_message', {
          senderId: session.user.id,
          recipientId: recipient.id,
          message: messageData.data // Transmettre le contenu complet du message
        })
      }
      
      // Rafraîchir les messages immédiatement après l'envoi
      if (chatBoxRef.current) {
        await chatBoxRef.current.fetchLatestMessages();
      }

      setMessage('')
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (status === 'loading' || !recipient) {
    return (
      <div className="wrapper flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <section className="flex flex-col h-[600px]">
        <header className="flex items-center p-4 border-b border-gray-200">
          <Link href="/users" className="text-gray-700 mr-3">
            <ArrowLeft size={24} />
          </Link>
          {recipient && (
            <>
              <div className="relative h-12 w-12">
                <Image
                  src={recipient.image || '/placeholder.png'}
                  alt={`${recipient.firstName} ${recipient.lastName}`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="font-medium text-lg">
                  {recipient.firstName} {recipient.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {recipient.status === 'online' ? 'En ligne' : 'Hors ligne'}
                </p>
              </div>
            </>  
          )}
        </header>

        {session && recipient && (
          <ChatBox 
            ref={chatBoxRef}
            currentUserId={session.user.id} 
            recipientId={recipient.id} 
            recipientImage={recipient.image || '/placeholder.png'} 
            socket={socket}
          />
        )}

        {session && recipient && (
          <form onSubmit={sendMessage} className="flex items-center p-4 border-t border-gray-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message ici..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className={`p-2 rounded-r-md ${
                message.trim() ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </form>
        )}
      </section>
    </div>
  )
}
