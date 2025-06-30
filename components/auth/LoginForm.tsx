'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        throw new Error("Email ou mot de passe incorrect")
      }

      window.location.href = '/users'
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Adresse mail</label>
          <input
            type="email"
            placeholder="Entrer votre Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
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
            <p className="text-red-500 text-xs">{errors.password.message}</p>
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
        Pas encore inscrit ? <Link href="/" className="text-primary hover:underline">Inscrivez-vous</Link>
      </div>
    </>
  )
}
