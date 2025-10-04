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

    // Upload de l'image vers Cloudinary
    let imageUrl = ""
    if (imageFile && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "non-stop-chat/users",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(buffer)
        }) as any

        imageUrl = uploadResult.secure_url
      } catch (uploadError) {
        console.error("Erreur upload image:", uploadError)
        // Continuer sans image si l'upload échoue
      }
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