import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth-simple"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Tentative de connexion simple...')
    
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      )
    }

    console.log('👤 Vérification utilisateur:', email)

    // Utilisateur de test en dur (contournement DB)
    let user = null
    
    if (email === 'test@example.com' && password === 'password123') {
      console.log('✅ Utilisateur de test reconnu')
      user = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        image: null
      }
    } else {
      // Essayer la base de données pour les vrais utilisateurs
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            password: true,
            image: true
          }
        })

        if (dbUser) {
          console.log('🔑 Vérification mot de passe DB...')
          const isPasswordValid = await bcrypt.compare(password, dbUser.password)
          
          if (isPasswordValid) {
            user = {
              id: dbUser.id,
              email: dbUser.email,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              image: dbUser.image
            }
          }
        }
      } catch (dbError) {
        console.warn('⚠️ DB non accessible, utilisation du mode test uniquement')
      }
    }

    if (!user) {
      console.log('❌ Utilisateur non trouvé ou mot de passe incorrect')
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    console.log('✅ Authentification réussie, création du token...')

    // Créer un JWT léger
    const token = await createToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image || undefined
    })

    console.log('🍪 Définition du cookie de session...')

    // Créer la réponse avec cookie
    const response = NextResponse.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image
      }
    })

    // Définir le cookie de session (nom différent pour éviter les conflits)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 heures
      path: '/'
    })

    console.log('🎉 Connexion simple réussie pour:', user.email)
    return response

  } catch (error) {
    console.error("❌ Erreur connexion simple:", error)
    return NextResponse.json(
      { message: "Erreur serveur lors de la connexion" },
      { status: 500 }
    )
  }
}
