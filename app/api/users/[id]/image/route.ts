import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Vérifier la configuration Cloudinary
function checkCloudinaryConfig() {
  const missing = []
  if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME')
  if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY')
  if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET')
  
  if (missing.length > 0) {
    console.error('❌ Variables Cloudinary manquantes:', missing.join(', '))
    return false
  }
  
  console.log('✅ Configuration Cloudinary OK')
  return true
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Vérifier que l'utilisateur peut modifier son propre profil
    if (session.user.id !== params.id) {
      return NextResponse.json(
        { message: "Vous ne pouvez modifier que votre propre profil" },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const imageFile = formData.get('image') as File

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { message: "Aucun fichier image fourni" },
        { status: 400 }
      )
    }

    // Vérifier la configuration Cloudinary
    if (!checkCloudinaryConfig()) {
      return NextResponse.json(
        { message: "Configuration Cloudinary manquante" },
        { status: 500 }
      )
    }

    console.log('📸 Mise à jour image profil:', {
      userId: params.id,
      fileName: imageFile.name,
      fileSize: imageFile.size,
      fileType: imageFile.type
    })

    // Upload vers Cloudinary
    let imageUrl = ""
    try {
      console.log('🚀 Upload Cloudinary en cours...')
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "non-stop-chat/users",
            public_id: `user-${params.id}`, // ID unique par utilisateur
            overwrite: true, // Remplacer l'ancienne image
          },
          (error, result) => {
            if (error) {
              console.error('❌ Erreur Cloudinary:', error)
              reject(error)
            } else {
              console.log('✅ Upload Cloudinary réussi:', result?.secure_url)
              resolve(result)
            }
          }
        ).end(buffer)
      }) as any

      imageUrl = uploadResult.secure_url
    } catch (uploadError) {
      console.error("❌ Erreur upload image:", uploadError)
      return NextResponse.json(
        { message: "Erreur lors de l'upload de l'image" },
        { status: 500 }
      )
    }

    // Mettre à jour l'utilisateur dans la BDD
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { image: imageUrl },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      }
    })

    console.log('💾 Image mise à jour en BDD:', {
      userId: updatedUser.id,
      imageUrl: updatedUser.image
    })

    return NextResponse.json({
      message: "Image de profil mise à jour avec succès",
      user: updatedUser
    })

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
