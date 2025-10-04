'use client'

import { useSession } from 'next-auth/react'

export default function SessionDebug() {
  const { data: session, status } = useSession()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-0 left-0 bg-black text-white p-2 text-xs z-50 max-w-md">
      <h3 className="font-bold">Debug Session:</h3>
      <div>Status: {status}</div>
      <div>Has Session: {session ? 'Yes' : 'No'}</div>
      {session && (
        <>
          <div>User ID: {session.user?.id}</div>
          <div>Email: {session.user?.email}</div>
          <div>Name: {session.user?.firstName} {session.user?.lastName}</div>
        </>
      )}
    </div>
  )
}
