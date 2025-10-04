'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ChatBox from '@/components/chat/ChatBox'
import FileUpload from '@/components/chat/FileUpload'
import { useUserStatus } from '@/hooks/useUserStatus'
import { useHeartbeat } from '@/hooks/useHeartbeat'
import UserAvatar from '@/components/ui/UserAvatar'
import { User } from '@prisma/client'

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { getUserStatus } = useUserStatus()
  
  // Activer le heartbeat pour maintenir le statut online
  useHeartbeat()

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

  // Fonction pour gérer l'upload de fichier
  const handleFileUpload = async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload')
    }

    return response.json()
  }

  // Référence au composant ChatBox pour pouvoir appeler ses méthodes
  const chatBoxRef = React.useRef<{fetchLatestMessages: () => Promise<void>}>(null);
  
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if ((!message.trim() && !selectedFile) || !session?.user?.id || !recipient?.id) return

    setIsUploading(true)
    
    try {
      let fileData = null
      
      // Upload du fichier si présent
      if (selectedFile) {
        const uploadResult = await handleFileUpload(selectedFile)
        fileData = uploadResult.file
      }
      
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message || (fileData ? `Fichier partagé: ${fileData.fileName}` : ''),
          recipientId: recipient.id,
          ...(fileData && {
            fileUrl: fileData.url,
            fileName: fileData.fileName,
            fileType: fileData.fileType,
            fileSize: fileData.fileSize,
            publicId: fileData.publicId,
          }),
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message')
      }
      
      // Rafraîchir les messages immédiatement après l'envoi
      if (chatBoxRef.current) {
        await chatBoxRef.current.fetchLatestMessages();
      }

      setMessage('')
      setSelectedFile(null)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'envoi du message')
    } finally {
      setIsUploading(false)
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
              <UserAvatar
                src={recipient.image}
                alt={`${recipient.firstName} ${recipient.lastName}`}
                size="lg"
              />
              <div className="ml-3">
                <h2 className="font-medium text-lg">
                  {recipient.firstName} {recipient.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {getUserStatus(recipient.id) === 'online' ? 'En ligne' : 'Hors ligne'}
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
            recipientName={`${recipient.firstName} ${recipient.lastName}`}
          />
        )}

        {session && recipient && (
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            {/* Zone d'upload de fichier */}
            <div className="mb-3">
              <FileUpload
                onFileSelect={setSelectedFile}
                onFileRemove={() => setSelectedFile(null)}
                selectedFile={selectedFile}
                isUploading={isUploading}
              />
            </div>
            
            {/* Zone de saisie de message */}
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isUploading}
              />
              <button
                type="submit"
                className={`p-2 rounded-r-md ${
                  (message.trim() || selectedFile) && !isUploading
                    ? 'bg-primary text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={(!message.trim() && !selectedFile) || isUploading}
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
