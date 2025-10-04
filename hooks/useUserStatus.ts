'use client'

import { useEffect, useState } from 'react'
import { pusherClient, PUSHER_EVENTS, PUSHER_CHANNELS } from '@/lib/pusher'

interface UserStatusUpdate {
  userId: string
  firstName: string
  lastName: string
  status: string
  timestamp: string
}

export function useUserStatus() {
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({})

  useEffect(() => {
    // S'abonner au canal de statut des utilisateurs
    const channel = pusherClient.subscribe(PUSHER_CHANNELS.USER_STATUS)

    const handleStatusUpdate = (data: UserStatusUpdate) => {
      console.log('Mise à jour du statut utilisateur:', data)
      
      setUserStatuses(prevStatuses => ({
        ...prevStatuses,
        [data.userId]: data.status
      }))
    }

    channel.bind(PUSHER_EVENTS.USER_STATUS_UPDATED, handleStatusUpdate)

    return () => {
      channel.unbind(PUSHER_EVENTS.USER_STATUS_UPDATED, handleStatusUpdate)
      pusherClient.unsubscribe(PUSHER_CHANNELS.USER_STATUS)
    }
  }, [])

  const updateUserStatus = async (userId: string, status: 'online' | 'offline') => {
    try {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      throw error
    }
  }

  const getUserStatus = (userId: string): string => {
    return userStatuses[userId] || 'offline'
  }

  return {
    userStatuses,
    updateUserStatus,
    getUserStatus
  }
}
