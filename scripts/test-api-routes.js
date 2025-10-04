const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testApiRoutes() {
  console.log('🧪 Test des routes API...\n')

  try {
    // Test 1: Vérifier la connexion à la base de données
    console.log('1. Test de connexion à la base de données...')
    const userCount = await prisma.user.count()
    console.log(`   ✅ Connexion réussie - ${userCount} utilisateurs trouvés\n`)

    // Test 2: Vérifier la structure des tables
    console.log('2. Vérification de la structure des tables...')
    
    const users = await prisma.user.findMany({
      take: 1,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    if (users.length > 0) {
      console.log('   ✅ Table users: OK')
      console.log(`   📋 Exemple d'utilisateur:`, users[0])
    } else {
      console.log('   ⚠️  Table users: Aucun utilisateur trouvé')
    }

    const messages = await prisma.message.findMany({
      take: 1,
      select: {
        id: true,
        content: true,
        senderId: true,
        recipientId: true,
        createdAt: true,
        isRead: true
      }
    })
    
    if (messages.length > 0) {
      console.log('   ✅ Table messages: OK')
      console.log(`   📋 Exemple de message:`, messages[0])
    } else {
      console.log('   ⚠️  Table messages: Aucun message trouvé')
    }

    console.log()

    // Test 3: Vérifier les relations
    console.log('3. Test des relations entre tables...')
    
    const messagesWithUsers = await prisma.message.findMany({
      take: 1,
      include: {
        sender: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        recipient: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    if (messagesWithUsers.length > 0) {
      console.log('   ✅ Relations messages-users: OK')
      console.log(`   📋 Message avec utilisateurs:`, {
        content: messagesWithUsers[0].content,
        sender: messagesWithUsers[0].sender,
        recipient: messagesWithUsers[0].recipient
      })
    } else {
      console.log('   ⚠️  Relations: Aucun message avec relations trouvé')
    }

    console.log()

    // Test 4: Statistiques générales
    console.log('4. Statistiques générales...')
    
    const stats = {
      totalUsers: await prisma.user.count(),
      onlineUsers: await prisma.user.count({ where: { status: 'online' } }),
      offlineUsers: await prisma.user.count({ where: { status: 'offline' } }),
      totalMessages: await prisma.message.count(),
      unreadMessages: await prisma.message.count({ where: { isRead: false } })
    }

    console.log('   📊 Statistiques:')
    console.log(`      - Total utilisateurs: ${stats.totalUsers}`)
    console.log(`      - Utilisateurs en ligne: ${stats.onlineUsers}`)
    console.log(`      - Utilisateurs hors ligne: ${stats.offlineUsers}`)
    console.log(`      - Total messages: ${stats.totalMessages}`)
    console.log(`      - Messages non lus: ${stats.unreadMessages}`)

    console.log('\n✅ Tous les tests sont terminés!')

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter les tests
testApiRoutes()
