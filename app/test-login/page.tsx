'use client'

import { useState } from 'react'

export default function TestLogin() {
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setResult('🔄 Test en cours...')
    
    try {
      console.log('🧪 Test de connexion directe...')
      
      const response = await fetch('/api/auth/simple-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(`✅ Connexion réussie ! 
        User: ${data.user.firstName} ${data.user.lastName}
        Email: ${data.user.email}
        Cookie défini: auth-token`)
        
        // Redirection après 2 secondes
        setTimeout(() => {
          window.location.href = '/users'
        }, 2000)
      } else {
        setResult(`❌ Erreur ${response.status}: ${data.message}`)
      }
    } catch (error) {
      setResult(`❌ Erreur réseau: ${error}`)
      console.error('Erreur test login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">🧪 Test de Connexion</h1>
        
        {result && (
          <div className={`p-4 rounded mb-4 text-sm whitespace-pre-line ${
            result.includes('✅') 
              ? 'bg-green-100 text-green-700' 
              : result.includes('❌')
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {result}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => testLogin('test@example.com', 'password123')}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? '⏳ Test...' : '🧪 Test avec Utilisateur Fictif'}
          </button>

          <div className="text-center text-gray-500 text-sm">
            Ou testez avec vos vrais identifiants :
          </div>

          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            testLogin(email, password)
          }}>
            <div className="space-y-3">
              <input
                name="email"
                type="email"
                placeholder="Votre email"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? '⏳ Connexion...' : '🔐 Se Connecter'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <a href="/login" className="text-blue-600 hover:underline text-sm">
              ← Retour au login normal
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
