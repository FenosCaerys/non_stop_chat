'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

// Vérification côté client uniquement pour éviter les erreurs SSR
const isClient = typeof window !== 'undefined';

const signupSchema = z.object({
  firstName: z.string().min(1, "Le nom est requis"),
  lastName: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  image: isClient 
    ? z.instanceof(FileList).refine(files => files.length > 0, "L'image est requise")
    : z.any() // Fallback pour le SSR
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('image', data.image[0])

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Une erreur est survenue lors de l\'inscription')
      }

      window.location.href = '/login'
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {errorMessage && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              placeholder="Nom"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message?.toString()}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              placeholder="Prénom"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message?.toString()}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Adresse mail</label>
          <input
            type="email"
            placeholder="Entrer votre Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-1 relative">
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Entrer votre mot de passe"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              {...register('password')}
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Sélectionner une Image</label>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/jpg"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('image')}
          />
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image.message?.toString()}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white p-2 rounded font-medium hover:bg-opacity-90 transition-colors"
        >
          {isLoading ? 'Chargement...' : 'Continuer vers le chat'}
        </button>
      </form>
      
      <div className="text-center mt-4">
        Déjà inscrit ? <Link href="/login" className="text-primary hover:underline">Connectez-vous</Link>
      </div>
    </>
  )
}
