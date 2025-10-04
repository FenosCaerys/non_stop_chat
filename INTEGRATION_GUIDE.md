# Guide d'Intégration Pusher + Cloudinary

## 🎯 Résumé des Changements

Cette intégration remplace **Socket.io** par **Pusher** pour la messagerie temps réel et ajoute **Cloudinary** pour l'upload de fichiers en production.

## 📦 Nouvelles Dépendances

```json
{
  "pusher": "^5.1.3",
  "pusher-js": "^8.4.0-rc2",
  "cloudinary": "^1.41.3",
  "multer": "^1.4.5-lts.1",
  "@types/multer": "^1.4.7"
}
```

## 🔧 Configuration Requise

### Variables d'Environnement

Copiez `.env.example` vers `.env` et configurez :

```bash
# Pusher Configuration
NEXT_PUBLIC_PUSHER_APP_ID="your-pusher-app-id"
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### Comptes Requis

1. **Pusher** : Créez un compte sur [pusher.com](https://pusher.com)
   - Créez une nouvelle app
   - Récupérez les clés dans le dashboard

2. **Cloudinary** : Créez un compte sur [cloudinary.com](https://cloudinary.com)
   - Récupérez les clés dans le dashboard

## 🗄️ Base de Données

Le schéma Prisma a été étendu pour supporter les pièces jointes :

```prisma
model Message {
  // ... champs existants
  fileUrl      String?  @map("file_url")
  fileName     String?  @map("file_name")
  fileType     String?  @map("file_type")
  fileSize     Int?     @map("file_size")
  publicId     String?  @map("public_id")
}
```

## 🚀 Nouveaux Composants

### 1. FileUpload Component
- **Localisation** : `components/chat/FileUpload.tsx`
- **Fonction** : Interface d'upload de fichiers avec validation
- **Formats supportés** : Images, vidéos, audio, PDF, documents

### 2. MessageAttachment Component
- **Localisation** : `components/chat/MessageAttachment.tsx`
- **Fonction** : Affichage des pièces jointes dans les messages
- **Fonctionnalités** : Prévisualisation, téléchargement

## 🔄 APIs Modifiées

### 1. `/api/messages` (POST)
- Support des pièces jointes
- Intégration Pusher pour temps réel

### 2. `/api/upload` (POST/DELETE)
- Upload vers Cloudinary
- Validation des fichiers
- Gestion des permissions

### 3. `/api/pusher` (POST/GET)
- Authentification des canaux
- Déclenchement d'événements

## 📁 Structure des Fichiers

```
lib/
├── pusher.ts          # Configuration Pusher client/serveur
├── cloudinary.ts      # Configuration et utilitaires Cloudinary

components/chat/
├── FileUpload.tsx     # Interface d'upload
├── MessageAttachment.tsx  # Affichage des pièces jointes
├── ChatBox.tsx        # Mis à jour pour Pusher

app/api/
├── upload/route.ts    # API d'upload Cloudinary
├── pusher/route.ts    # API Pusher
├── messages/route.ts  # Mis à jour avec pièces jointes
```

## 🔥 Fonctionnalités

### Messagerie Temps Réel (Pusher)
- ✅ Messages instantanés
- ✅ Canaux privés sécurisés
- ✅ Pas de serveur Socket.io requis
- ✅ Scalable en production

### Upload de Fichiers (Cloudinary)
- ✅ Images (JPEG, PNG, GIF, WebP)
- ✅ Vidéos (MP4, WebM)
- ✅ Audio (MP3, WAV)
- ✅ Documents (PDF, DOC, DOCX, TXT)
- ✅ Optimisation automatique
- ✅ CDN global
- ✅ Limite : 10MB par fichier

## 🚦 Démarrage

1. **Installation des dépendances** :
   ```bash
   npm install
   ```

2. **Configuration de l'environnement** :
   ```bash
   cp .env.example .env
   # Remplir les variables Pusher et Cloudinary
   ```

3. **Migration de la base de données** :
   ```bash
   npx prisma migrate dev
   ```

4. **Démarrage du serveur** :
   ```bash
   npm run dev
   ```

## 🧪 Test des Fonctionnalités

### Test Pusher
1. Ouvrez deux onglets avec des utilisateurs différents
2. Envoyez un message
3. Vérifiez la réception instantanée

### Test Cloudinary
1. Cliquez sur l'icône de pièce jointe
2. Sélectionnez un fichier
3. Envoyez le message
4. Vérifiez l'affichage et le téléchargement

## 🔒 Sécurité

- **Pusher** : Canaux privés avec authentification
- **Cloudinary** : Upload sécurisé avec validation côté serveur
- **Validation** : Types et tailles de fichiers contrôlés
- **Permissions** : Seuls les propriétaires peuvent supprimer leurs fichiers

## 📈 Production

### Pusher
- Configurez les limites selon votre plan
- Surveillez les connexions simultanées
- Activez les webhooks si nécessaire

### Cloudinary
- Configurez les transformations automatiques
- Surveillez le quota de stockage
- Activez la modération de contenu si nécessaire

## 🐛 Dépannage

### Pusher ne fonctionne pas
- Vérifiez les clés dans `.env`
- Vérifiez le cluster configuré
- Consultez les logs du navigateur

### Upload échoue
- Vérifiez les clés Cloudinary
- Vérifiez la taille du fichier (max 10MB)
- Vérifiez le type de fichier autorisé

## 🔄 Migration depuis Socket.io

Les changements suivants ont été effectués :
- ❌ Suppression du serveur Socket.io (`server/index.js`)
- ❌ Suppression des dépendances Socket.io
- ✅ Remplacement par Pusher dans `ChatBox.tsx`
- ✅ Simplification de `server.js`
- ✅ Nouvelle architecture sans serveur WebSocket dédié
