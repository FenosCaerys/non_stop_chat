const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testImages() {
  console.log('🖼️ Test des images de profil...\n')

  try {
    // Récupérer tous les utilisateurs avec leurs images
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`📊 Total utilisateurs: ${users.length}\n`)

    let usersWithImages = 0
    let usersWithCloudinaryImages = 0
    let usersWithBase64Images = 0
    let usersWithoutImages = 0

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`)
      
      if (user.image) {
        usersWithImages++
        
        if (user.image.startsWith('https://res.cloudinary.com')) {
          usersWithCloudinaryImages++
          console.log(`   ✅ Image Cloudinary: ${user.image.substring(0, 60)}...`)
        } else if (user.image.startsWith('data:image/')) {
          usersWithBase64Images++
          console.log(`   ✅ Image Base64: ${user.image.substring(0, 30)}... (${user.image.length} caractères)`)
        } else {
          console.log(`   ⚠️  Image autre format: ${user.image.substring(0, 60)}...`)
        }
      } else {
        usersWithoutImages++
        console.log(`   ❌ Pas d'image`)
      }
      
      console.log(`   📅 Créé le: ${user.createdAt.toLocaleDateString('fr-FR')}`)
      console.log()
    })

    // Statistiques finales
    console.log('📈 Statistiques des images:')
    console.log(`   - Utilisateurs avec images: ${usersWithImages}/${users.length}`)
    console.log(`   - Images Cloudinary: ${usersWithCloudinaryImages}`)
    console.log(`   - Images Base64: ${usersWithBase64Images}`)
    console.log(`   - Sans image: ${usersWithoutImages}`)

    // Vérifier la configuration Cloudinary
    console.log('\n🔧 Configuration Cloudinary:')
    const cloudinaryConfig = {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Configuré' : '❌ Manquant',
      apiKey: process.env.CLOUDINARY_API_KEY ? '✅ Configuré' : '❌ Manquant',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? '✅ Configuré' : '❌ Manquant'
    }
    
    console.log(`   - Cloud Name: ${cloudinaryConfig.cloudName}`)
    console.log(`   - API Key: ${cloudinaryConfig.apiKey}`)
    console.log(`   - API Secret: ${cloudinaryConfig.apiSecret}`)

    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                                  process.env.CLOUDINARY_API_KEY && 
                                  process.env.CLOUDINARY_API_SECRET

    console.log(`\n${isCloudinaryConfigured ? '✅' : '⚠️'} Cloudinary ${isCloudinaryConfigured ? 'configuré' : 'non configuré'} - ${isCloudinaryConfigured ? 'Upload vers Cloudinary' : 'Fallback vers Base64'}`)

  } catch (error) {
    console.error('❌ Erreur lors du test des images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le test
testImages()
