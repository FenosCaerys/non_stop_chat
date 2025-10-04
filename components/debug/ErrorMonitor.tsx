'use client'

import { useState, useEffect } from 'react'

interface ErrorLog {
  id: string
  timestamp: string
  type: 'error' | 'warning' | 'info'
  message: string
  source?: string
}

export default function ErrorMonitor() {
  const [errors, setErrors] = useState<ErrorLog[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Intercepter les erreurs globales
    const handleError = (event: ErrorEvent) => {
      const error: ErrorLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: 'error',
        message: event.message,
        source: event.filename
      }
      setErrors(prev => [error, ...prev.slice(0, 9)])
    }

    // Intercepter les promesses rejetées
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error: ErrorLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: 'error',
        message: `Promise rejected: ${event.reason}`,
        source: 'Promise'
      }
      setErrors(prev => [error, ...prev.slice(0, 9)])
    }

    // Intercepter les erreurs de fetch
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args)
        if (!response.ok) {
          const error: ErrorLog = {
            id: Date.now().toString(),
            timestamp: new Date().toLocaleTimeString(),
            type: 'warning',
            message: `HTTP ${response.status}: ${args[0]}`,
            source: 'Fetch'
          }
          setErrors(prev => [error, ...prev.slice(0, 9)])
        }
        return response
      } catch (err) {
        const error: ErrorLog = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: 'error',
          message: `Fetch failed: ${err}`,
          source: 'Fetch'
        }
        setErrors(prev => [error, ...prev.slice(0, 9)])
        throw err
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.fetch = originalFetch
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <>
      {/* Bouton flottant pour afficher/masquer */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full text-white font-bold shadow-lg transition-colors ${
          errors.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
        }`}
        title={`${errors.length} erreur(s) détectée(s)`}
      >
        {errors.length}
      </button>

      {/* Panel d'erreurs */}
      {isVisible && (
        <div className="fixed bottom-20 left-4 z-50 bg-black text-white p-4 rounded-lg shadow-xl max-w-md max-h-80 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Monitor d'Erreurs</h3>
            <button 
              onClick={() => setErrors([])}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Clear
            </button>
          </div>
          
          {errors.length === 0 ? (
            <p className="text-green-400 text-xs">✅ Aucune erreur détectée</p>
          ) : (
            <div className="space-y-2">
              {errors.map((error) => (
                <div 
                  key={error.id}
                  className={`p-2 rounded text-xs border-l-4 ${
                    error.type === 'error' 
                      ? 'bg-red-900 border-red-500' 
                      : error.type === 'warning'
                      ? 'bg-yellow-900 border-yellow-500'
                      : 'bg-blue-900 border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs opacity-75">
                      {error.timestamp}
                    </span>
                    {error.source && (
                      <span className="text-xs opacity-75">
                        {error.source}
                      </span>
                    )}
                  </div>
                  <p className="text-xs break-words">
                    {error.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
