'use client'

import { useState, useEffect } from 'react'

interface HealthData {
  status: string
  timestamp: string
  latency: string
  database: {
    status: string
    latency: string
  }
  session: {
    status: string
    user?: {
      id: string
      email: string
      name: string
    }
  }
  environment: any
  version: string
  deployment: string
}

export default function HealthStatus() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkHealth = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/health', {
        cache: 'no-store'
      })
      
      if (response.ok) {
        const data = await response.json()
        setHealthData(data)
      } else {
        setHealthData({
          status: `❌ Erreur ${response.status}`,
          timestamp: new Date().toISOString(),
          latency: 'N/A',
          database: { status: '❌ Non testé', latency: 'N/A' },
          session: { status: '❌ Non testé' },
          environment: {},
          version: 'N/A',
          deployment: 'N/A'
        })
      }
    } catch (error) {
      console.error('Erreur health check:', error)
      setHealthData({
        status: '❌ Erreur réseau',
        timestamp: new Date().toISOString(),
        latency: 'N/A',
        database: { status: '❌ Erreur', latency: 'N/A' },
        session: { status: '❌ Erreur' },
        environment: {},
        version: 'N/A',
        deployment: 'N/A'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isVisible) {
      checkHealth()
    }
  }, [isVisible])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <>
      {/* Bouton Health Check */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg hover:bg-blue-700 transition-colors"
        title="Health Check"
      >
        🏥 Health
      </button>

      {/* Panel Health Status */}
      {isVisible && (
        <div className="fixed top-16 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-md max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Health Status</h3>
            <div className="flex gap-2">
              <button 
                onClick={checkHealth}
                disabled={isLoading}
                className="bg-blue-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
              >
                {isLoading ? '⏳' : '🔄'}
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          {healthData ? (
            <div className="space-y-3 text-xs">
              {/* Status général */}
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium">{healthData.status}</div>
                <div className="text-gray-600">
                  Latence: {healthData.latency} | {healthData.deployment}
                </div>
                <div className="text-gray-500">
                  {new Date(healthData.timestamp).toLocaleTimeString()}
                </div>
              </div>

              {/* Base de données */}
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium">Base de données</div>
                <div>{healthData.database.status}</div>
                <div className="text-gray-600">Latence: {healthData.database.latency}</div>
              </div>

              {/* Session */}
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium">Session</div>
                <div>{healthData.session.status}</div>
                {healthData.session.user && (
                  <div className="text-gray-600">
                    {healthData.session.user.name} ({healthData.session.user.email})
                  </div>
                )}
              </div>

              {/* Variables d'environnement */}
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-medium mb-1">Configuration</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>DB: {healthData.environment.database}</div>
                  <div>Auth: {healthData.environment.nextAuthSecret}</div>
                  <div>Cloudinary: {healthData.environment.cloudinary?.cloudName}</div>
                  <div>Pusher: {healthData.environment.pusher?.key}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-xs">
              Cliquez sur 🔄 pour vérifier le statut
            </div>
          )}
        </div>
      )}
    </>
  )
}
