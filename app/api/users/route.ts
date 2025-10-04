import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Forcer le rendu dynamique pour cette route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Récupérer tous les utilisateurs sauf l'utilisateur actuel
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id
        }
      },
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
        firstName: 'asc'
      }
    })

    // Debug: Log des images pour voir ce qui est retourné
    console.log('Users avec images:', users.map(u => ({ 
      name: `${u.firstName} ${u.lastName}`, 
      image: u.image,
      hasImage: !!u.image 
    })))

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la récupération des utilisateurs" },
      { status: 500 }
    )
  }
}