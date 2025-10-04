# Guide de Dépannage - Problèmes d'Images

## 🚨 Problèmes Identifiés et Solutions

### 1. **Erreur 500 lors de l'upload d'image**

**Symptômes :**
```
PUT /api/users/[id]/image 500 (Internal Server Error)
❌ Erreur upload: Error: Erreur lors de l'upload de l'image
```

**Causes possibles :**
- Configuration Cloudinary manquante ou incorrecte
- Problème de session utilisateur
- Fichier trop volumineux ou format non supporté

**Solutions :**

#### A. Vérifier la configuration Cloudinary
```bash
# Tester la configuration
curl http://localhost:3000/api/test-cloudinary
```

#### B. Vérifier les variables d'environnement
```bash
# Dans votre .env.local
CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"
```

#### C. Tester avec le script de diagnostic
```bash
node scripts/test-images.js
```

### 2. **Images de profil non affichées**

**Symptômes :**
- Avatar par défaut affiché au lieu de l'image uploadée
- Images manquantes dans la liste des utilisateurs

**Solutions :**

#### A. Vérifier les données en base
```bash
node scripts/test-images.js
```

#### B. Composant UserAvatar avec fallback
Le nouveau composant `UserAvatar` gère automatiquement :
- ✅ Images Cloudinary
- ✅ Images Base64 (fallback)
- ✅ Initiales si pas d'image
- ✅ Gestion des erreurs de chargement

### 3. **Système de Fallback Automatique**

L'application utilise maintenant un système de fallback :

1. **Cloudinary configuré** → Upload vers Cloudinary
2. **Cloudinary échoue** → Conversion en Base64
3. **Pas de Cloudinary** → Stockage Base64 direct
4. **Erreur d'affichage** → Initiales de l'utilisateur

## 🔧 Tests et Diagnostic

### Scripts de Test Disponibles

```bash
# Test de la configuration Cloudinary
curl http://localhost:3000/api/test-cloudinary

# Test des images en base de données
node scripts/test-images.js

# Test de la connexion DB
node scripts/test-db-connection.js

# Test des routes API
node scripts/test-api-routes.js
```

### Composants de Debug (Développement)

- `SessionDebug` : Affiche l'état de la session
- `ImageUploadDebug` : Logs des uploads d'images en temps réel

## 🛠️ Corrections Apportées

### Routes API Améliorées

1. **`/api/users/[id]/image`** - Upload d'image avec fallback
2. **`/api/auth/signup`** - Inscription avec gestion d'image
3. **`/api/test-cloudinary`** - Test de configuration

### Composants Créés/Modifiés

1. **`UserAvatar`** - Composant robuste pour les avatars
2. **`UpdateProfileImage`** - Upload avec gestion d'erreurs
3. **`ImageUploadDebug`** - Debug en temps réel

### Fonctionnalités Ajoutées

- ✅ Fallback automatique Base64 si Cloudinary échoue
- ✅ Validation des fichiers (taille, type)
- ✅ Gestion des erreurs robuste
- ✅ Affichage d'initiales si pas d'image
- ✅ Logs détaillés pour le debugging

## 📋 Checklist de Vérification

### Avant de signaler un problème :

- [ ] Variables Cloudinary configurées dans `.env.local`
- [ ] Test de `/api/test-cloudinary` réussi
- [ ] Session utilisateur active (vérifier avec `SessionDebug`)
- [ ] Fichier image < 5MB et format supporté
- [ ] Logs de la console vérifiés
- [ ] Script `test-images.js` exécuté

### Configuration Minimale Requise :

```env
# Optionnel - Si absent, utilise Base64
CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key" 
CLOUDINARY_API_SECRET="votre-api-secret"

# Obligatoire
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="votre-secret"
```

## 🚀 Fonctionnement Actuel

1. **Upload d'image** → Essai Cloudinary → Fallback Base64 si échec
2. **Affichage** → UserAvatar avec gestion d'erreurs automatique
3. **Inscription** → Image optionnelle avec fallback
4. **Mise à jour** → Remplacement de l'ancienne image

L'application fonctionne maintenant **avec ou sans Cloudinary** configuré !

## 📞 Support

Si les problèmes persistent :
1. Vérifiez les logs de la console navigateur
2. Exécutez les scripts de test
3. Vérifiez les composants de debug en développement
4. Consultez les logs serveur pour plus de détails
