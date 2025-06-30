'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import LoginForm from '@/components/auth/LoginForm'

export default function Login() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/users')
    }
  }, [status, router])

  return (
    <div className="wrapper">
      <section className="p-6">
        <header className="text-2xl font-semibold pb-2 border-b border-gray-200 mb-5 text-center">
          NonStop Chat
        </header>
        <LoginForm />
      </section>
    </div>
  )
}
