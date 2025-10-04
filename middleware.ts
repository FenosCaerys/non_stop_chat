import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ajouter des headers de sécurité uniquement
  const response = NextResponse.next()
  
  // Headers de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Headers pour les API (sans bloquer l'authentification)
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
