import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier l'authentification pour les routes protégées
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.json(
        { message: 'Non autorisé' },
        { status: 401 }
      )
    }
  }

  // Ajouter des headers de sécurité
  const response = NextResponse.next()
  
  // Headers de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Headers pour les API
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/chat/:path*',
    '/users/:path*'
  ]
}
