import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Route de debug pour vérifier les données utilisateur
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Analyser les données
    const analysis = users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      hasImage: !!user.image,
      imageUrl: user.image,
      imageLength: user.image?.length || 0,
      isCloudinaryUrl: user.image?.includes('cloudinary.com') || false,
      createdAt: user.createdAt
    }))

    return NextResponse.json({
      totalUsers: users.length,
      usersWithImages: users.filter(u => u.image).length,
      usersWithoutImages: users.filter(u => !u.image).length,
      analysis,
      rawUsers: users
    })

  } catch (error) {
    console.error("Erreur debug users:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}
