import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Test de la base de données
    let dbStatus = "❌ Erreur"
    let dbLatency = 0
    try {
      const dbStart = Date.now()
      await prisma.user.count()
      dbLatency = Date.now() - dbStart
      dbStatus = "✅ OK"
    } catch (dbError) {
      console.error("Erreur DB:", dbError)
      dbStatus = `❌ Erreur: ${dbError instanceof Error ? dbError.message : 'Erreur inconnue'}`
    }

    // Test de la session
    let sessionStatus = "❌ Erreur"
    let currentUser = null
    try {
      const session = await getServerSession(authOptions)
      if (session?.user) {
        sessionStatus = "✅ Authentifié"
        currentUser = {
          id: session.user.id,
          email: session.user.email,
          name: `${session.user.firstName} ${session.user.lastName}`
        }
      } else {
        sessionStatus = "⚠️ Non authentifié"
      }
    } catch (sessionError) {
      console.error("Erreur Session:", sessionError)
      sessionStatus = `❌ Erreur: ${sessionError instanceof Error ? sessionError.message : 'Erreur inconnue'}`
    }

    // Variables d'environnement
    const envStatus = {
      database: process.env.DATABASE_URL ? "✅ Configuré" : "❌ Manquant",
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? "✅ Configuré" : "❌ Manquant",
      nextAuthUrl: process.env.NEXTAUTH_URL ? "✅ Configuré" : "❌ Manquant",
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "✅ Configuré" : "❌ Manquant",
        apiKey: process.env.CLOUDINARY_API_KEY ? "✅ Configuré" : "❌ Manquant",
        apiSecret: process.env.CLOUDINARY_API_SECRET ? "✅ Configuré" : "❌ Manquant"
      },
      pusher: {
        appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID ? "✅ Configuré" : "❌ Manquant",
        key: process.env.NEXT_PUBLIC_PUSHER_KEY ? "✅ Configuré" : "❌ Manquant",
        secret: process.env.PUSHER_SECRET ? "✅ Configuré" : "❌ Manquant",
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ? "✅ Configuré" : "❌ Manquant"
      }
    }

    const totalLatency = Date.now() - startTime

    const healthData = {
      status: "✅ Service opérationnel",
      timestamp: new Date().toISOString(),
      latency: `${totalLatency}ms`,
      database: {
        status: dbStatus,
        latency: `${dbLatency}ms`
      },
      session: {
        status: sessionStatus,
        user: currentUser
      },
      environment: envStatus,
      version: "1.0.0",
      deployment: process.env.VERCEL_ENV || "development"
    }

    return NextResponse.json(healthData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache'
      }
    })

  } catch (error) {
    console.error("Erreur health check:", error)
    
    return NextResponse.json({
      status: "❌ Service en erreur",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Erreur inconnue",
      database: { status: "❌ Non testé" },
      session: { status: "❌ Non testé" }
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
  }
}
