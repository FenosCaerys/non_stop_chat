'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useHeartbeat() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id) {
      return
    }

    // Envoyer un heartbeat immédiatement
    const sendHeartbeat = async () => {
      try {
        await fetch('/api/users/heartbeat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Erreur lors de l\'envoi du heartbeat:', error)
      }
    }

    // Envoyer le premier heartbeat
    sendHeartbeat()

    // Configurer un intervalle pour envoyer un heartbeat toutes les 2 minutes
    const heartbeatInterval = setInterval(sendHeartbeat, 2 * 60 * 1000)

    // Gérer la visibilité de la page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendHeartbeat()
      }
    }

    // Gérer les événements de focus/blur de la fenêtre
    const handleFocus = () => {
      sendHeartbeat()
    }

    // Ajouter les event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    // Cleanup
    return () => {
      clearInterval(heartbeatInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [session?.user?.id, status])
}
