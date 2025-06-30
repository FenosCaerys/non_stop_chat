'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface User {
  id: string
  firstName: string
  lastName: string
  image: string
  status: string
}

interface LastMessage {
  id: string
  last_message: string | null
  message_date: string | null
  sender_id: string | null
  is_read: boolean
}

export default function UsersList({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<User[]>([])
  const [lastMessages, setLastMessages] = useState<Record<string, LastMessage>>({}) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Récupération des utilisateurs...')
        const response = await fetch('/api/users')
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("Réponse d'erreur:", errorData)
          throw new Error(`Erreur ${response.status}: ${errorData.message || 'Erreur lors de la récupération des utilisateurs'}`)
        }
        
        const data = await response.json()
        console.log('Utilisateurs récupérés:', data.users)
        setUsers(data.users)
        setError(null)
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error)
        setError(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchLastMessages = async () => {
      try {
        const response = await fetch('/api/messages/last')
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des derniers messages')
        }
        
        const data = await response.json()
        
        // Convertir le tableau en objet indexé par ID utilisateur
        const messagesMap: Record<string, LastMessage> = {}
        data.lastMessages.forEach((msg: LastMessage) => {
          messagesMap[msg.id] = msg
        })
        
        setLastMessages(messagesMap)
      } catch (error) {
        console.error('Erreur lors de la récupération des derniers messages:', error)
      }
    }

    fetchUsers()
    fetchLastMessages()

    // Configurer un intervalle pour rafraîchir la liste des utilisateurs et les derniers messages
    const usersInterval = setInterval(fetchUsers, 10000)
    const messagesInterval = setInterval(fetchLastMessages, 5000)
    
    return () => {
      clearInterval(usersInterval)
      clearInterval(messagesInterval)
    }
  }, [])

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user => 
    user.id !== currentUserId && 
    (searchTerm === '' || 
     `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-5">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-500">
        {error}
      </div>
    )
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-5 text-gray-500">
        {searchTerm ? 'Aucun utilisateur trouvé pour cette recherche' : 'Aucun utilisateur disponible'}
      </div>
    )
  }

  return (
    <div className="max-h-[350px] overflow-y-auto">
      {filteredUsers.map(user => (
        <Link 
          href={`/chat/${user.id}`} 
          key={user.id}
          className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                src={user.image || '/placeholder.png'}
                alt={`${user.firstName} ${user.lastName}`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-5 max-w-[200px]">
              <h3 className="font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <p className={`text-sm ${lastMessages[user.id]?.sender_id !== currentUserId && !lastMessages[user.id]?.is_read ? 'font-bold text-gray-800' : 'text-gray-500'} truncate`}>
                {lastMessages[user.id]?.last_message 
                  ? lastMessages[user.id].last_message 
                  : user.status === 'online' ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>
          <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </Link>
      ))}
    </div>
  )
}
