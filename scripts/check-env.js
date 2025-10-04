// Script pour vérifier les variables d'environnement Cloudinary
console.log('🔍 Vérification des variables Cloudinary...\n')

const requiredVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY', 
  'CLOUDINARY_API_SECRET'
]

let allPresent = true

requiredVars.forEach(varName => {
  const value = process.env[varName]
  const isPresent = !!value
  const displayValue = isPresent ? `${value.substring(0, 4)}...` : 'MANQUANT'
  
  console.log(`${isPresent ? '✅' : '❌'} ${varName}: ${displayValue}`)
  
  if (!isPresent) {
    allPresent = false
  }
})

console.log(`\n${allPresent ? '✅' : '❌'} Configuration Cloudinary: ${allPresent ? 'COMPLÈTE' : 'INCOMPLÈTE'}`)

if (!allPresent) {
  console.log('\n🔧 Actions requises:')
  console.log('1. Créer un compte Cloudinary sur https://cloudinary.com')
  console.log('2. Récupérer les clés API dans le dashboard')
  console.log('3. Ajouter les variables dans .env.local ou sur Vercel')
}
