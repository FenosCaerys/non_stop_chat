import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Test NextAuth Configuration...')
    
    // Vérifier les variables d'environnement
    const envCheck = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Non défini',
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV
    }
    
    console.log('📋 Variables d\'environnement:', envCheck)
    
    // Tester la session
    let sessionTest = null
    let sessionError = null
    
    try {
      sessionTest = await getServerSession(authOptions)
      console.log('✅ Session récupérée:', !!sessionTest)
    } catch (error) {
      sessionError = error instanceof Error ? error.message : 'Erreur inconnue'
      console.error('❌ Erreur session:', sessionError)
    }
    
    return NextResponse.json({
      status: "✅ Test NextAuth",
      timestamp: new Date().toISOString(),
      environment: envCheck,
      session: {
        exists: !!sessionTest,
        user: sessionTest?.user ? {
          id: sessionTest.user.id,
          email: sessionTest.user.email,
          name: `${sessionTest.user.firstName} ${sessionTest.user.lastName}`
        } : null,
        error: sessionError
      },
      authOptions: {
        providers: authOptions.providers.length,
        strategy: authOptions.session?.strategy,
        pages: authOptions.pages
      }
    })
    
  } catch (error) {
    console.error("❌ Erreur test NextAuth:", error)
    
    return NextResponse.json({
      status: "❌ Erreur test NextAuth",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
