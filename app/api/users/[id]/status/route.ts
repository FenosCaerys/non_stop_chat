import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    // Vérifier si l'utilisateur modifie son propre statut
    if (session.user.id !== params.id) {
      return NextResponse.json(
        { message: "Vous ne pouvez modifier que votre propre statut" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['online', 'offline'].includes(status)) {
      return NextResponse.json(
        { message: "Statut invalide" },
        { status: 400 }
      )
    }

    // Mettre à jour le statut de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { status },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la mise à jour du statut" },
      { status: 500 }
    )
  }
}
