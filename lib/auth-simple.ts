import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-me'
)

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export interface Session {
  user: User
  expires: string
}

// Créer un JWT léger
export async function createToken(user: User): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    hasImage: !!user.image
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}

// Vérifier un JWT
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    
    return {
      id: payload.id as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      image: payload.hasImage ? '' : undefined // Image sera récupérée depuis la DB
    }
  } catch (error) {
    console.error('Erreur vérification token:', error)
    return null
  }
}

// Récupérer la session depuis les cookies
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) {
      return null
    }
    
    const user = await verifyToken(token)
    if (!user) {
      return null
    }
    
    // Récupérer l'image depuis la DB si nécessaire
    if (user.image === '') {
      const { prisma } = await import('./prisma')
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { image: true }
      })
      user.image = dbUser?.image || undefined
    }
    
    return {
      user,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  } catch (error) {
    console.error('Erreur récupération session:', error)
    return null
  }
}

// Récupérer la session depuis une requête
export async function getSessionFromRequest(request: NextRequest): Promise<Session | null> {
  try {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return null
    }
    
    const user = await verifyToken(token)
    if (!user) {
      return null
    }
    
    return {
      user,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  } catch (error) {
    console.error('Erreur récupération session depuis requête:', error)
    return null
  }
}

// Définir un cookie de session
export function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 heures
    path: '/'
  })
}

// Supprimer le cookie de session
export function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}
