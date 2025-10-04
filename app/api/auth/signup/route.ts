import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { z } from "zod"

const signupSchema = z.object({
  firstName: z.string().min(1, "Le nom est requis"),
  lastName: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Valider les données du formulaire
    const validationResult = signupSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: validationResult.error.format() },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, password } = validationResult.data
    
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      )
    }

    // Traiter l'image avec Cloudinary
    const image = formData.get("image") as File
    if (!image) {
      return NextResponse.json(
        { message: "L'image est requise" },
        { status: 400 }
      )
    }

    let imageUrl = ""
    
    try {
      // Vérifier la taille du fichier (max 5MB pour les avatars)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (image.size > maxSize) {
        return NextResponse.json(
          { message: "L'image est trop volumineuse (max 5MB)" },
          { status: 400 }
        )
      }

      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { message: "Type d'image non autorisé (JPEG, PNG, GIF, WebP uniquement)" },
          { status: 400 }
        )
      }
      
      // Lire le contenu de l'image
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Upload vers Cloudinary
      const uploadResult = await uploadToCloudinary(
        buffer,
        image.name,
        'user-avatars'
      )
      
      imageUrl = uploadResult.secure_url
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error)
      return NextResponse.json(
        { message: "Erreur lors de l'enregistrement de l'image" },
        { status: 500 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(password, 12)
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image: imageUrl,
        status: "offline",
      },
    })

    return NextResponse.json(
      { 
        message: "Inscription réussie",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    )
  }
}
