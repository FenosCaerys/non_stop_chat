'use client'

import { useSession } from 'next-auth/react'

export default function DebugSession() {
  const { data: session } = useSession()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed top-0 right-0 bg-black text-white p-2 text-xs z-50 max-w-sm">
      <h3>Debug Session:</h3>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  )
}
