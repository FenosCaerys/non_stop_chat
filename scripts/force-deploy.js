const { execSync } = require('child_process')

console.log('🚀 Force redéploiement de l\'application...\n')

try {
  // Ajouter un timestamp pour forcer le redéploiement
  const timestamp = new Date().toISOString()
  
  console.log('📝 Création du fichier de déploiement...')
  const deployInfo = {
    timestamp,
    version: '1.0.0',
    corrections: [
      'Gestion d\'erreurs JSON robuste',
      'Configuration NextAuth corrigée',
      'Service Worker optimisé',
      'Monitoring d\'erreurs ajouté',
      'Health check implémenté'
    ]
  }
  
  require('fs').writeFileSync(
    'public/deploy-info.json', 
    JSON.stringify(deployInfo, null, 2)
  )
  
  console.log('📦 Commit et push des modifications...')
  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "🔧 Corrections erreurs - ${timestamp}"`, { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  
  console.log('\n✅ Redéploiement forcé avec succès!')
  console.log('⏳ Attendez quelques minutes pour que Vercel redéploie...')
  console.log('🔗 Vérifiez le déploiement sur: https://vercel.com/dashboard')
  
} catch (error) {
  console.error('❌ Erreur lors du redéploiement:', error.message)
  process.exit(1)
}
