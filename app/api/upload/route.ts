import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { uploadToCloudinary } from "@/lib/cloudinary"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Récupérer les données du formulaire
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { message: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "Le fichier est trop volumineux (max 10MB)" },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/webm',
      'audio/mpeg',
      'audio/wav'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Type de fichier non autorisé" },
        { status: 400 }
      )
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Uploader vers Cloudinary
    const uploadResult = await uploadToCloudinary(
      buffer,
      file.name,
      `chat-uploads/${session.user.id}`
    )

    // Retourner les informations du fichier uploadé
    return NextResponse.json({
      success: true,
      file: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        format: uploadResult.format,
        resourceType: uploadResult.resource_type,
        width: uploadResult.width,
        height: uploadResult.height,
      }
    })

  } catch (error) {
    console.error("Erreur lors de l'upload:", error)
    return NextResponse.json(
      { message: "Erreur lors de l'upload du fichier" },
      { status: 500 }
    )
  }
}

// Endpoint pour supprimer un fichier
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json(
        { message: "Public ID requis" },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur a le droit de supprimer ce fichier
    if (!publicId.includes(session.user.id)) {
      return NextResponse.json(
        { message: "Accès refusé" },
        { status: 403 }
      )
    }

    // Supprimer de Cloudinary
    const { deleteFromCloudinary } = await import("@/lib/cloudinary")
    await deleteFromCloudinary(publicId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    return NextResponse.json(
      { message: "Erreur lors de la suppression du fichier" },
      { status: 500 }
    )
  }
}
