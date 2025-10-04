'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Camera } from 'lucide-react'

export default function UpdateProfileImage() {
  const { data: session, update } = useSession()
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !session?.user?.id) return

    setIsUploading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      console.log('📤 Upload image profil en cours...')
      
      const response = await fetch(`/api/users/${session.user.id}/image`, {
        method: 'PUT',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de l\'upload')
      }

      console.log('✅ Image profil mise à jour:', result.user.image)
      
      // Mettre à jour la session avec la nouvelle image
      await update({
        ...session,
        user: {
          ...session.user,
          image: result.user.image
        }
      })

      setMessage({ type: 'success', text: 'Photo de profil mise à jour !' })
      
      // Recharger la page après 2 secondes pour voir les changements
      setTimeout(() => {
        window.location.reload()
      }, 2000)

    } catch (error: any) {
      console.error('❌ Erreur upload:', error)
      setMessage({ type: 'error', text: error.message })
    } finally {
      setIsUploading(false)
    }
  }

  if (!session?.user) return null

  return (
    <div className="relative">
      <input
        type="file"
        id="profile-image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={isUploading}
      />
      
      <label
        htmlFor="profile-image-upload"
        className={`absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-white ${
          isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
        title="Changer la photo de profil"
      >
        <Camera size={14} />
      </label>

      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {message && (
        <div className={`absolute top-full mt-3 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg animate-fade-in ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              message.type === 'success' ? 'bg-green-400' : 'bg-red-400'
            }`}></span>
            {message.text}
          </div>
          {/* Petite flèche pointant vers l'avatar */}
          <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
            message.type === 'success' ? 'bg-green-50 border-l border-t border-green-200' : 'bg-red-50 border-l border-t border-red-200'
          }`}></div>
        </div>
      )}
    </div>
  )
}
