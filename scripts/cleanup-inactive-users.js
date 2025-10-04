const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanupInactiveUsers() {
  try {
    console.log('🧹 Démarrage du nettoyage des utilisateurs inactifs...')
    
    // Marquer comme offline les utilisateurs qui n'ont pas été actifs depuis 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    const result = await prisma.user.updateMany({
      where: {
        status: 'online',
        updatedAt: {
          lt: fiveMinutesAgo
        }
      },
      data: {
        status: 'offline'
      }
    })

    console.log(`📴 ${result.count} utilisateurs marqués comme offline`)
    
    // Statistiques
    const onlineUsers = await prisma.user.count({
      where: { status: 'online' }
    })
    
    const offlineUsers = await prisma.user.count({
      where: { status: 'offline' }
    })
    
    console.log(`📊 Statistiques actuelles:`)
    console.log(`   - Utilisateurs en ligne: ${onlineUsers}`)
    console.log(`   - Utilisateurs hors ligne: ${offlineUsers}`)
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le script
cleanupInactiveUsers()
