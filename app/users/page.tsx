'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Search, LogOut } from 'lucide-react'
import Image from 'next/image'
import UsersList from '@/components/users/UsersList'
import UpdateProfileImage from '@/components/UpdateProfileImage'
import UserAvatar from '@/components/ui/UserAvatar'
import { useHeartbeat } from '@/hooks/useHeartbeat'

export default function Users() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  
  // Activer le heartbeat pour maintenir le statut online
  useHeartbeat()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      // Mettre l'utilisateur en ligne à la connexion
      fetch(`/api/users/${session.user.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'online' }),
      }).catch(error => {
        console.error('Erreur mise à jour statut online:', error)
      })
    }
  }, [status, router, session?.user?.id])

  const handleLogout = async () => {
    // Mettre à jour le statut de l'utilisateur à "offline" avant de se déconnecter
    if (session?.user?.id) {
      await fetch(`/api/users/${session.user.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'offline' }),
      })
    }
    
    await signOut({ redirect: false })
    router.push('/login')
  }

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
    if (!isSearchActive) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus()
      }, 100)
    } else {
      setSearchTerm('')
    }
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="wrapper flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <section className="p-6 pt-10">
        <header className="flex items-center justify-between pb-5 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative group">
              <UserAvatar
                src={session?.user?.image}
                alt={`${session?.user?.firstName} ${session?.user?.lastName}`}
                size="lg"
                className="transition-all duration-200 group-hover:brightness-75"
              />
              <UpdateProfileImage />
              
              {/* Overlay subtil au hover */}
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                  Modifier
                </span>
              </div>
            </div>
            <div className="ml-5">
              <h2 className="font-medium text-lg">
                {session?.user?.firstName} {session?.user?.lastName}
              </h2>
              <p className="text-sm text-green-600">En ligne</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </header>

        <div className="relative my-5">
          <div className="flex items-center justify-between">
            <span className={`text-lg transition-opacity ${isSearchActive ? 'opacity-0' : 'opacity-100'}`}>
              Sélectionnez un utilisateur
            </span>
            <div className="flex items-center">
              <input
                id="search-input"
                type="text"
                placeholder="Entrez un nom à rechercher..."
                className={`border border-gray-300 rounded-l-md p-2 transition-all ${
                  isSearchActive ? 'w-full opacity-100' : 'w-0 opacity-0 pointer-events-none'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={toggleSearch}
                className={`p-2 rounded-r-md ${
                  isSearchActive ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        <UsersList currentUserId={session?.user?.id || ''} searchTerm={searchTerm} />
      </section>
    </div>
  )
}
