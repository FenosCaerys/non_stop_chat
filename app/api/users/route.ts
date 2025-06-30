import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions)
    
    console.log("Session dans /api/users:", JSON.stringify(session, null, 2))
    
    if (!session?.user) {
      console.log("Utilisateur non authentifié dans /api/users")
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Récupérer tous les utilisateurs sauf l'utilisateur actuel
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        image: true,
        status: true,
      },
      orderBy: [
        { status: 'desc' }, // 'online' avant 'offline'
        { firstName: 'asc' }
      ],
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la récupération des utilisateurs" },
      { status: 500 }
    )
  }
}
