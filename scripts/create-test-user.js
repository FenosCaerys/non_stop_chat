const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('🔐 Création d\'un utilisateur de test...')
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })
    
    if (existingUser) {
      console.log('✅ Utilisateur de test existe déjà:', existingUser.email)
      return existingUser
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: hashedPassword,
        image: null
      }
    })
    
    console.log('✅ Utilisateur de test créé avec succès:')
    console.log('📧 Email: test@example.com')
    console.log('🔑 Mot de passe: password123')
    console.log('👤 Nom: Test User')
    
    return user
    
  } catch (error) {
    console.error('❌ Erreur création utilisateur de test:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  createTestUser()
    .then(() => {
      console.log('🎉 Script terminé avec succès')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Script échoué:', error)
      process.exit(1)
    })
}

module.exports = { createTestUser }
