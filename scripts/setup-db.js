const { execSync } = require('child_process');
const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

async function main() {
  console.log('Configuration de la base de données...');
  
  try {
    // Extraire les informations de connexion de DATABASE_URL
    const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
    const databaseUrlMatch = envContent.match(/DATABASE_URL=["']?(.*?)["']?\n/);
    
    if (!databaseUrlMatch) {
      throw new Error('DATABASE_URL non trouvée dans le fichier .env');
    }
    
    const databaseUrl = databaseUrlMatch[1];
    const dbConfig = parseDatabaseUrl(databaseUrl);
    
    // Créer la base de données si elle n'existe pas
    console.log('Vérification de l\'existence de la base de données...');
    await createDatabaseIfNotExists(dbConfig);
    
    // Exécuter la génération du client Prisma
    console.log('Génération du client Prisma...');
    execSync('node node_modules/prisma/build/index.js generate', { stdio: 'inherit' });
    
    // Créer les tables en utilisant le schéma Prisma avec migrations
    console.log('Création des migrations et des tables...');
    try {
      execSync('node node_modules/prisma/build/index.js migrate dev --name init', { stdio: 'inherit' });
      console.log('Migrations et tables créées avec succès!');
    } catch (error) {
      console.log('Erreur lors de la création des migrations, tentative avec db push...');
      execSync('node node_modules/prisma/build/index.js db push', { stdio: 'inherit' });
      console.log('Tables créées avec succès via db push!');
    }
    
    console.log('Configuration de la base de données terminée avec succès!');
    
  } catch (error) {
    console.error('Erreur lors de la configuration de la base de données:', error);
    process.exit(1);
  }
}

// Fonction pour analyser l'URL de la base de données
function parseDatabaseUrl(url) {
  // Format: postgresql://username:password@host:port/database?schema=public
  const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):([^\/]+)\/([^?]+)/;
  const match = url.match(regex);
  
  if (!match) {
    throw new Error('Format d\'URL de base de données invalide');
  }
  
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4]),
    database: match[5].split('?')[0]
  };
}

// Fonction pour créer la base de données si elle n'existe pas
async function createDatabaseIfNotExists(config) {
  // Se connecter à PostgreSQL sans spécifier de base de données
  const client = new Client({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: 'postgres' // Base de données par défaut pour la connexion initiale
  });
  
  try {
    await client.connect();
    
    // Vérifier si la base de données existe
    const checkResult = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [config.database]
    );
    
    if (checkResult.rows.length === 0) {
      console.log(`La base de données '${config.database}' n'existe pas. Création en cours...`);
      // Créer la base de données
      await client.query(`CREATE DATABASE ${config.database}`);
      console.log(`Base de données '${config.database}' créée avec succès!`);
    } else {
      console.log(`La base de données '${config.database}' existe déjà.`);
    }
  } finally {
    await client.end();
  }
}

main();
