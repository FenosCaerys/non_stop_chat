const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkUserImages() {
  try {
    console.log('🔍 Vérification des images utilisateurs dans la BDD...\n')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`📊 Total utilisateurs: ${users.length}\n`)

    users.forEach((user, index) => {
      console.log(`👤 Utilisateur ${index + 1}:`)
      console.log(`   Nom: ${user.firstName} ${user.lastName}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Image: ${user.image || '❌ AUCUNE IMAGE'}`)
      console.log(`   Image présente: ${user.image ? '✅ OUI' : '❌ NON'}`)
      console.log(`   Créé le: ${user.createdAt}`)
      console.log('   ---')
    })

    // Statistiques
    const usersWithImages = users.filter(u => u.image && u.image.length > 0)
    const usersWithoutImages = users.filter(u => !u.image || u.image.length === 0)

    console.log('\n📈 STATISTIQUES:')
    console.log(`   Utilisateurs avec image: ${usersWithImages.length}`)
    console.log(`   Utilisateurs sans image: ${usersWithoutImages.length}`)
    
    if (usersWithImages.length > 0) {
      console.log('\n🖼️  EXEMPLES D\'URLS D\'IMAGES:')
      usersWithImages.slice(0, 3).forEach(user => {
        console.log(`   ${user.firstName}: ${user.image}`)
      })
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserImages()
