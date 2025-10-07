// Utilitaire pour gérer les réponses API de manière robuste
export async function safeApiCall<T>(
  url: string, 
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    console.log(`🔄 API Call: ${options.method || 'GET'} ${url}`)
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    console.log(`📡 Response: ${response.status} ${response.statusText}`)

    // Récupérer le texte brut d'abord
    const responseText = await response.text()
    console.log(`📄 Response text length: ${responseText.length}`)

    // Vérifier si on a du contenu
    if (!responseText) {
      return {
        error: `Réponse vide du serveur (${response.status})`,
        status: response.status
      }
    }

    // Essayer de parser le JSON
    let data: T
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError)
      console.error('📄 Raw response:', responseText.substring(0, 200))
      
      return {
        error: `Réponse serveur invalide: ${responseText.substring(0, 100)}...`,
        status: response.status
      }
    }

    // Vérifier le statut HTTP
    if (!response.ok) {
      const errorMessage = (data as any)?.message || `Erreur HTTP ${response.status}`
      return {
        error: errorMessage,
        status: response.status
      }
    }

    console.log('✅ API Call successful')
    return {
      data,
      status: response.status
    }

  } catch (networkError) {
    console.error('❌ Network Error:', networkError)
    return {
      error: `Erreur réseau: ${networkError instanceof Error ? networkError.message : 'Connexion impossible'}`,
      status: 0
    }
  }
}

// Fonction spécifique pour l'authentification
export async function loginUser(email: string, password: string) {
  return safeApiCall<{
    message: string
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      image?: string
    }
  }>('/api/auth/simple-login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

// Fonction pour tester la connectivité
export async function pingServer() {
  return safeApiCall<{
    status: string
    timestamp: string
  }>('/api/ping')
}
