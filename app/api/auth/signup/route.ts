import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Schéma de validation pour l'inscription
const signupSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extraire les données du FormData
    const userData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    const imageFile = formData.get('image') as File

    // Valider les données
    const validationResult = signupSchema.safeParse(userData)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: "Données invalides", 
          errors: validationResult.error.format() 
        },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, password } = validationResult.data

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      )
    }

    // Upload de l'image vers Cloudinary ou stockage base64 en fallback
    let imageUrl = ""
    console.log('📸 Vérification du fichier image:', {
      hasFile: !!imageFile,
      fileName: imageFile?.name,
      fileSize: imageFile?.size,
      fileType: imageFile?.type
    })

    if (imageFile && imageFile.size > 0) {
      // Vérifier si Cloudinary est configuré
      const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                                 process.env.CLOUDINARY_API_KEY && 
                                 process.env.CLOUDINARY_API_SECRET

      if (hasCloudinaryConfig) {
        // Essayer Cloudinary d'abord
        try {
          console.log('🚀 Début upload Cloudinary...')
          const bytes = await imageFile.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                resource_type: "image",
                folder: "non-stop-chat/users",
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
          console.log('🎯 URL finale de l\'image (Cloudinary):', imageUrl)
        } catch (uploadError) {
          console.error("❌ Erreur upload Cloudinary:", uploadError)
          console.log("🔄 Fallback vers stockage base64...")
          
          // Fallback vers base64
          try {
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`
            console.log('🎯 URL finale de l\'image (base64):', imageUrl.substring(0, 50) + '...')
          } catch (base64Error) {
            console.error("❌ Erreur conversion base64:", base64Error)
          }
        }
      } else {
        // Pas de Cloudinary configuré, utiliser base64 directement
        console.log('⚠️ Cloudinary non configuré, utilisation du stockage base64')
        
        try {
          const bytes = await imageFile.arrayBuffer()
          const buffer = Buffer.from(bytes)
          imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`
          console.log('🎯 URL finale de l\'image (base64):', imageUrl.substring(0, 50) + '...')
        } catch (base64Error) {
          console.error("❌ Erreur conversion base64:", base64Error)
        }
      }
    } else {
      console.log('⚠️ Aucun fichier image fourni ou fichier vide')
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image: imageUrl,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        createdAt: true,
      }
    })

    console.log('💾 Utilisateur créé dans la BDD:', {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      imageInDB: user.image,
      hasImageInDB: !!user.image
    })

    return NextResponse.json(
      { 
        message: "Utilisateur créé avec succès",
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    
    // Gestion des erreurs Prisma spécifiques
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    )
  }
}