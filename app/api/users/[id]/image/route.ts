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
    console.log('🔄 Début upload image pour utilisateur:', params.id)
    
    const session = await getServerSession(authOptions)
    
    console.log('Session dans upload image:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      requestedUserId: params.id
    })
    
    if (!session?.user) {
      console.log('❌ Pas de session utilisateur')
      return NextResponse.json(
        { message: "Non autorisé - Veuillez vous connecter" },
        { status: 401 }
      )
    }

    // Vérifier que l'utilisateur peut modifier son propre profil
    if (session.user.id !== params.id) {
      console.log('❌ Tentative de modification du profil d\'un autre utilisateur')
      return NextResponse.json(
        { message: "Vous ne pouvez modifier que votre propre profil" },
        { status: 403 }
      )
    }

    let formData
    let imageFile
    
    try {
      formData = await request.formData()
      imageFile = formData.get('image') as File
      
      console.log('📁 FormData reçue:', {
        hasImage: !!imageFile,
        fileName: imageFile?.name,
        fileSize: imageFile?.size,
        fileType: imageFile?.type
      })
    } catch (formError) {
      console.error('❌ Erreur parsing FormData:', formError)
      return NextResponse.json(
        { message: "Erreur lors de la lecture du fichier" },
        { status: 400 }
      )
    }

    if (!imageFile || imageFile.size === 0) {
      console.log('❌ Aucun fichier image fourni')
      return NextResponse.json(
        { message: "Aucun fichier image fourni" },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      console.log('❌ Fichier trop volumineux:', imageFile.size)
      return NextResponse.json(
        { message: "Le fichier est trop volumineux (max 5MB)" },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    if (!imageFile.type.startsWith('image/')) {
      console.log('❌ Type de fichier invalide:', imageFile.type)
      return NextResponse.json(
        { message: "Le fichier doit être une image" },
        { status: 400 }
      )
    }

    // Vérifier la configuration Cloudinary
    if (!checkCloudinaryConfig()) {
      console.log('❌ Configuration Cloudinary manquante')
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

    // Upload vers Cloudinary ou stockage base64 en fallback
    let imageUrl = ""
    
    // Vérifier si Cloudinary est configuré
    const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                               process.env.CLOUDINARY_API_KEY && 
                               process.env.CLOUDINARY_API_SECRET

    if (hasCloudinaryConfig) {
      // Upload vers Cloudinary
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
        console.error("❌ Erreur upload Cloudinary:", uploadError)
        console.log("🔄 Fallback vers stockage base64...")
        
        // Fallback vers base64
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`
      }
    } else {
      // Pas de Cloudinary configuré, utiliser base64
      console.log('⚠️ Cloudinary non configuré, utilisation du stockage base64')
      
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`
        console.log('✅ Image convertie en base64 (taille:', buffer.length, 'bytes)')
      } catch (base64Error) {
        console.error("❌ Erreur conversion base64:", base64Error)
        return NextResponse.json(
          { message: "Erreur lors du traitement de l'image" },
          { status: 500 }
        )
      }
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
