'use client'

import Image from 'next/image'
import { useState } from 'react'

interface UserAvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

export default function UserAvatar({ src, alt, size = 'md', className = '' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Générer des initiales à partir du nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(alt)
  const sizeClass = sizeClasses[size]

  // Si pas d'image ou erreur de chargement, afficher les initiales
  if (!src || imageError) {
    return (
      <div 
        className={`${sizeClass} ${className} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm`}
        title={alt}
      >
        {initials}
      </div>
    )
  }

  return (
    <div className={`${sizeClass} ${className} relative rounded-full overflow-hidden bg-gray-200`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => {
          console.log(`❌ Erreur chargement image pour ${alt}:`, src)
          setImageError(true)
          setIsLoading(false)
        }}
        onLoad={() => {
          console.log(`✅ Image chargée pour ${alt}:`, src?.substring(0, 50) + '...')
          setIsLoading(false)
        }}
        sizes={size === 'xl' ? '64px' : size === 'lg' ? '48px' : size === 'md' ? '40px' : '32px'}
      />
    </div>
  )
}
