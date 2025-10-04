const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// Charger manuellement le fichier .env
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const lines = envContent.split('\n')
      
      lines.forEach(line => {
        const trimmedLine = line.trim()
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=')
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').replace(/^["']|["']$/g, '')
            process.env[key.trim()] = value
          }
        }
      })
      console.log('✅ Fichier .env chargé avec succès')
    } else {
      console.log('⚠️  Fichier .env non trouvé')
    }
  } catch (error) {
    console.log('⚠️  Erreur lors du chargement du .env:', error.message)
  }
}

// Charger les variables d'environnement
loadEnv()

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testDatabaseConnection() {
  console.log('🔍 Test de connexion à la base de données...\n')
  
  // Vérifier les variables d'environnement
  console.log('📋 Variables d\'environnement :')
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Définie' : '❌ Manquante'}`)
  if (process.env.DATABASE_URL) {
    // Masquer le mot de passe pour la sécurité
    const maskedUrl = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@')
    console.log(`URL (masquée): ${maskedUrl}`)
  }
  console.log('')

  try {
    // Test 1: Connexion basique
    console.log('🔌 Test 1: Connexion basique...')
    await prisma.$connect()
    console.log('✅ Connexion établie avec succès !\n')

    // Test 2: Requête simple
    console.log('📊 Test 2: Exécution d\'une requête...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Requête exécutée avec succès !')
    console.log('Résultat:', result)
    console.log('')

    // Test 3: Vérifier les tables existantes
    console.log('🗂️  Test 3: Vérification des tables...')
    try {
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `
      console.log('✅ Tables trouvées:')
      tables.forEach(table => {
        console.log(`  - ${table.table_name}`)
      })
      console.log('')
    } catch (error) {
      console.log('⚠️  Impossible de lister les tables (base vide ?)')
      console.log('')
    }

    // Test 4: Vérifier la table users si elle existe
    console.log('👥 Test 4: Vérification de la table users...')
    try {
      const userCount = await prisma.user.count()
      console.log(`✅ Table 'users' accessible - ${userCount} utilisateur(s) trouvé(s)`)
      
      if (userCount > 0) {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            status: true,
            createdAt: true
          },
          take: 3
        })
        console.log('📋 Premiers utilisateurs:')
        users.forEach(user => {
          console.log(`  - ${user.firstName} ${user.lastName} (${user.email}) - ${user.status}`)
        })
      }
      console.log('')
    } catch (error) {
      console.log('❌ Table \'users\' non accessible:', error.message)
      console.log('💡 Vous devrez peut-être exécuter: npx prisma db push')
      console.log('')
    }

    // Test 5: Vérifier les autres tables principales
    console.log('💬 Test 5: Vérification des autres tables...')
    const tablesToCheck = ['Message', 'Account', 'Session']
    
    for (const tableName of tablesToCheck) {
      try {
        const count = await prisma[tableName.toLowerCase()].count()
        console.log(`✅ Table '${tableName}': ${count} enregistrement(s)`)
      } catch (error) {
        console.log(`❌ Table '${tableName}': non accessible`)
      }
    }
    console.log('')

    console.log('🎉 Test de connexion terminé avec succès !')
    console.log('✅ Votre base de données est opérationnelle !')

  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:')
    console.error('')
    console.error('Type d\'erreur:', error.constructor.name)
    console.error('Message:', error.message)
    console.error('')
    
    // Diagnostics spécifiques
    if (error.message.includes('Can\'t reach database server')) {
      console.error('🔧 Solutions possibles:')
      console.error('1. Vérifiez que votre base Neon est active sur https://neon.tech')
      console.error('2. Vérifiez votre URL de connexion DATABASE_URL')
      console.error('3. Régénérez une nouvelle URL de connexion depuis Neon')
      console.error('4. Vérifiez votre connexion internet')
    } else if (error.message.includes('authentication failed')) {
      console.error('🔧 Solutions possibles:')
      console.error('1. Vérifiez le nom d\'utilisateur et mot de passe dans DATABASE_URL')
      console.error('2. Régénérez les credentials depuis Neon')
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('🔧 Solutions possibles:')
      console.error('1. Vérifiez le nom de la base de données dans DATABASE_URL')
      console.error('2. Créez la base de données sur Neon')
    }
    console.error('')
    
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Connexion fermée.')
  }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
  console.error('❌ Erreur non gérée:', error)
  process.exit(1)
})

// Exécuter le test
testDatabaseConnection()
  .catch((error) => {
    console.error('❌ Erreur fatale:', error)
    process.exit(1)
  })
