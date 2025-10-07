import { NextRequest, NextResponse } from "next/server"

// Route simple pour tester la connectivité
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: "✅ Serveur actif",
      timestamp: new Date().toISOString(),
      method: "GET",
      url: request.url,
      headers: {
        userAgent: request.headers.get('user-agent'),
        host: request.headers.get('host')
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: "❌ Erreur serveur",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    
    return NextResponse.json({
      status: "✅ POST reçu",
      timestamp: new Date().toISOString(),
      method: "POST",
      body,
      contentType: request.headers.get('content-type')
    })
  } catch (error) {
    return NextResponse.json({
      status: "❌ Erreur POST",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 })
  }
}
