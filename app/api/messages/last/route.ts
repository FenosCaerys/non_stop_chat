import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    
    const currentUserId = session.user.id
    
    // Récupérer tous les utilisateurs avec qui l'utilisateur courant a échangé des messages
    const conversations = await prisma.$queryRaw`
      WITH user_conversations AS (
        SELECT DISTINCT
          CASE
            WHEN sender_id = ${currentUserId} THEN recipient_id
            ELSE sender_id
          END as user_id
        FROM messages
        WHERE sender_id = ${currentUserId} OR recipient_id = ${currentUserId}
      )
      SELECT 
        u.id,
        (
          SELECT m.content
          FROM messages m
          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})
             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)
          ORDER BY m.created_at DESC
          LIMIT 1
        ) as last_message,
        (
          SELECT m.created_at
          FROM messages m
          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})
             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)
          ORDER BY m.created_at DESC
          LIMIT 1
        ) as message_date,
        (
          SELECT m.sender_id
          FROM messages m
          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})
             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)
          ORDER BY m.created_at DESC
          LIMIT 1
        ) as sender_id,
        (
          SELECT m.is_read
          FROM messages m
          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})
             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)
          ORDER BY m.created_at DESC
          LIMIT 1
        ) as is_read
      FROM users u
      WHERE u.id IN (SELECT user_id FROM user_conversations)
    `
    
    return NextResponse.json({ lastMessages: conversations })
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers messages:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
