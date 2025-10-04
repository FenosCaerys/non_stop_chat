'use client'

import { useState, useEffect } from 'react'

export default function ImageUploadDebug() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Intercepter les logs console pour les erreurs d'upload
    const originalError = console.error
    const originalLog = console.log

    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('upload') || message.includes('image') || message.includes('Cloudinary')) {
        setLogs(prev => [...prev.slice(-4), `❌ ${new Date().toLocaleTimeString()}: ${message}`])
      }
      originalError.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(' ')
      if (message.includes('📸') || message.includes('🚀') || message.includes('✅') || message.includes('❌')) {
        setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
      }
      originalLog.apply(console, args)
    }

    return () => {
      console.error = originalError
      console.log = originalLog
    }
  }, [])

  if (process.env.NODE_ENV !== 'development' || logs.length === 0) return null

  return (
    <div className="fixed top-4 left-4 bg-black text-white p-3 rounded-lg text-xs z-50 max-w-md max-h-40 overflow-y-auto">
      <h3 className="font-bold mb-2">Debug Upload Images:</h3>
      {logs.map((log, index) => (
        <div key={index} className="mb-1 text-xs">
          {log}
        </div>
      ))}
      <button 
        onClick={() => setLogs([])}
        className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
      >
        Clear
      </button>
    </div>
  )
}
