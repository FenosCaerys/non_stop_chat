import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🚪 Déconnexion simple...')
    
    const response = NextResponse.json({
      message: "Déconnexion réussie"
    })

    // Supprimer le cookie de session
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immédiatement
      path: '/'
    })

    console.log('✅ Déconnexion réussie')
    return response

  } catch (error) {
    console.error("❌ Erreur déconnexion:", error)
    return NextResponse.json(
      { message: "Erreur lors de la déconnexion" },
      { status: 500 }
    )
  }
}
