'use client'

import { useState, useEffect } from 'react'

interface NetworkTest {
  name: string
  url: string
  status: 'pending' | 'success' | 'error'
  response?: string
  error?: string
  duration?: number
}

export default function NetworkDiagnostic() {
  const [tests, setTests] = useState<NetworkTest[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const networkTests: Omit<NetworkTest, 'status'>[] = [
    { name: 'Health Check', url: '/api/health' },
    { name: 'NextAuth Test', url: '/api/auth/test' },
    { name: 'Users API', url: '/api/users' },
    { name: 'Messages API', url: '/api/messages/last' },
    { name: 'Cloudinary Test', url: '/api/test-cloudinary' }
  ]

  const runNetworkTests = async () => {
    setIsRunning(true)
    const results: NetworkTest[] = []

    for (const test of networkTests) {
      const testResult: NetworkTest = { ...test, status: 'pending' }
      results.push(testResult)
      setTests([...results])

      try {
        const startTime = Date.now()
        console.log(`🔄 Test réseau: ${test.name} (${test.url})`)
        
        const response = await fetch(test.url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const duration = Date.now() - startTime
        
        if (response.ok) {
          const data = await response.text()
          testResult.status = 'success'
          testResult.response = `${response.status} ${response.statusText}`
          testResult.duration = duration
          console.log(`✅ ${test.name}: ${response.status} (${duration}ms)`)
        } else {
          testResult.status = 'error'
          testResult.error = `HTTP ${response.status}: ${response.statusText}`
          testResult.duration = duration
          console.error(`❌ ${test.name}: ${response.status}`)
        }
      } catch (error) {
        testResult.status = 'error'
        testResult.error = error instanceof Error ? error.message : 'Erreur inconnue'
        console.error(`❌ ${test.name} failed:`, error)
      }

      // Mettre à jour le résultat
      setTests([...results])
      
      // Petite pause entre les tests
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    setIsRunning(false)
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <>
      {/* Bouton Network Test */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg hover:bg-green-700 transition-colors"
        title="Network Diagnostic"
      >
        🌐 Network
      </button>

      {/* Panel Network Tests */}
      {isVisible && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-lg max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Diagnostic Réseau</h3>
            <div className="flex gap-2">
              <button 
                onClick={runNetworkTests}
                disabled={isRunning}
                className="bg-green-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
              >
                {isRunning ? '⏳ Test...' : '🔄 Tester'}
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          {tests.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-xs">
              Cliquez sur "Tester" pour diagnostiquer le réseau
            </div>
          ) : (
            <div className="space-y-2">
              {tests.map((test, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded text-xs border-l-4 ${
                    test.status === 'success' 
                      ? 'bg-green-50 border-green-500' 
                      : test.status === 'error'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{test.name}</span>
                    <span className={`text-xs ${
                      test.status === 'success' ? 'text-green-600' :
                      test.status === 'error' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {test.status === 'success' ? '✅' : 
                       test.status === 'error' ? '❌' : '⏳'}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-1">
                    {test.url}
                  </div>
                  
                  {test.response && (
                    <div className="text-xs text-green-700">
                      {test.response} {test.duration && `(${test.duration}ms)`}
                    </div>
                  )}
                  
                  {test.error && (
                    <div className="text-xs text-red-700 break-words">
                      {test.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
