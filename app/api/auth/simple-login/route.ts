import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth-simple"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Tentative de connexion simple...')
    
    // Gestion robuste du parsing JSON
    let email: string, password: string
    
    try {
      const body = await request.json()
      email = body.email
      password = body.password
    } catch (parseError) {
      console.error('❌ Erreur parsing JSON:', parseError)
      return NextResponse.json(
        { 
          message: "Format de requête invalide",
          error: "JSON_PARSE_ERROR"
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }
    
    if (!email || !password) {
      return NextResponse.json(
        { 
          message: "Email et mot de passe requis",
          error: "MISSING_CREDENTIALS"
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
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
        { 
          message: "Email ou mot de passe incorrect",
          error: "INVALID_CREDENTIALS"
        },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
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
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
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
      { 
        message: "Erreur serveur lors de la connexion",
        error: "SERVER_ERROR"
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}
