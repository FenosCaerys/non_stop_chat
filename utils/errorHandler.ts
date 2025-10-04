// Utilitaire pour gérer les erreurs de façon robuste

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export async function safeJsonParse(response: Response): Promise<any> {
  try {
    const text = await response.text()
    
    if (!text || text.trim() === '') {
      return { 
        message: `Erreur ${response.status}: Réponse vide du serveur`,
        status: response.status 
      }
    }
    
    try {
      return JSON.parse(text)
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError)
      console.error('Texte reçu:', text.substring(0, 200))
      
      return { 
        message: `Erreur ${response.status}: Réponse invalide du serveur`,
        status: response.status,
        rawText: text.substring(0, 100)
      }
    }
  } catch (error) {
    console.error('Erreur lecture réponse:', error)
    return { 
      message: `Erreur ${response.status}: Impossible de lire la réponse`,
      status: response.status 
    }
  }
}

export async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    })
    
    return response
  } catch (error) {
    console.error(`Erreur fetch ${url}:`, error)
    throw new Error(`Erreur réseau: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

export function createApiError(message: string, status?: number): ApiError {
  return {
    message,
    status,
    code: status ? `HTTP_${status}` : 'UNKNOWN_ERROR'
  }
}
