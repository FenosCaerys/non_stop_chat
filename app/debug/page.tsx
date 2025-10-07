'use client'

import { useState } from 'react'
import { pingServer, loginUser } from '@/lib/api-client'

export default function DebugPage() {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string) => {
    setResults(prev => [`${new Date().toLocaleTimeString()} - ${message}`, ...prev])
  }

  const testConnectivity = async () => {
    setIsLoading(true)
    addResult('🔄 Test de connectivité...')
    
    try {
      const result = await pingServer()
      
      if (result.data) {
        addResult(`✅ Serveur accessible: ${result.data.status}`)
      } else {
        addResult(`❌ Erreur ping: ${result.error} (Status: ${result.status})`)
      }
    } catch (error) {
      addResult(`❌ Erreur réseau: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testLogin = async () => {
    setIsLoading(true)
    addResult('🔐 Test de connexion...')
    
    try {
      const result = await loginUser('test@example.com', 'password123')
      
      if (result.data) {
        addResult(`✅ Connexion réussie: ${result.data.user.email}`)
      } else {
        addResult(`❌ Erreur login: ${result.error} (Status: ${result.status})`)
      }
    } catch (error) {
      addResult(`❌ Erreur connexion: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testRawFetch = async () => {
    setIsLoading(true)
    addResult('🧪 Test fetch brut...')
    
    try {
      const response = await fetch('/api/ping')
      addResult(`📡 Response status: ${response.status} ${response.statusText}`)
      
      const text = await response.text()
      addResult(`📄 Response length: ${text.length} caractères`)
      
      if (text) {
        try {
          const json = JSON.parse(text)
          addResult(`✅ JSON valide: ${json.status}`)
        } catch (parseError) {
          addResult(`❌ JSON invalide: ${text.substring(0, 100)}...`)
        }
      } else {
        addResult(`❌ Réponse vide`)
      }
    } catch (error) {
      addResult(`❌ Erreur fetch: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Page de Diagnostic</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testConnectivity}
            disabled={isLoading}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            🌐 Test Connectivité
          </button>
          
          <button
            onClick={testLogin}
            disabled={isLoading}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            🔐 Test Connexion
          </button>
          
          <button
            onClick={testRawFetch}
            disabled={isLoading}
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            🧪 Test Fetch Brut
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📋 Résultats des Tests</h2>
            <button
              onClick={() => setResults([])}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Vider
            </button>
          </div>
          
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500">Aucun test exécuté. Cliquez sur un bouton pour commencer.</p>
            ) : (
              results.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Diagnostic de l'erreur "Unexpected end of JSON input"</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• <strong>Réponse vide :</strong> Le serveur ne renvoie aucun contenu</li>
            <li>• <strong>Timeout :</strong> La requête prend trop de temps</li>
            <li>• <strong>Erreur serveur :</strong> Code 500 avec réponse HTML au lieu de JSON</li>
            <li>• <strong>Problème réseau :</strong> Connexion interrompue</li>
            <li>• <strong>CORS :</strong> Requête bloquée par le navigateur</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a 
            href="/login" 
            className="text-blue-600 hover:underline"
          >
            ← Retour à la connexion
          </a>
        </div>
      </div>
    </div>
  )
}
