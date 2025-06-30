import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    
    const { senderId } = await request.json()
    
    if (!senderId) {
      return NextResponse.json({ error: 'ID de l\'expéditeur requis' }, { status: 400 })
    }
    
    // Marquer tous les messages non lus de cet expéditeur comme lus
    // Utiliser une requête SQL brute pour éviter les erreurs de typage
    await prisma.$executeRaw`
      UPDATE messages 
      SET is_read = true 
      WHERE sender_id = ${senderId} 
      AND recipient_id = ${session.user.id} 
      AND is_read = false
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors du marquage des messages comme lus:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
