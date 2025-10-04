import { NextRequest, NextResponse } from "next/server"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Vérifier les variables d'environnement Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const config = {
      cloudName: cloudName ? "✅ Configuré" : "❌ Manquant",
      apiKey: apiKey ? "✅ Configuré" : "❌ Manquant",
      apiSecret: apiSecret ? "✅ Configuré" : "❌ Manquant",
    }

    const allConfigured = cloudName && apiKey && apiSecret

    return NextResponse.json({
      status: allConfigured ? "✅ Cloudinary configuré correctement" : "❌ Configuration Cloudinary incomplète",
      config,
      cloudName: cloudName || "Non défini",
      message: allConfigured 
        ? "Cloudinary est prêt à être utilisé !" 
        : "Veuillez configurer toutes les variables Cloudinary dans votre fichier .env"
    })
  } catch (error) {
    return NextResponse.json({
      status: "❌ Erreur",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 })
  }
}
