# NonStop Chat

Une application de messagerie en temps réel construite avec Next.js, Tailwind CSS, Prisma et PostgreSQL.

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Liste des utilisateurs connectés
- Messagerie en temps réel
- Statut en ligne/hors ligne
- Recherche d'utilisateurs
- Interface utilisateur moderne et responsive

## Technologies utilisées

- **Frontend**: Next.js, Tailwind CSS, React
- **Backend**: Next.js API Routes
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: NextAuth.js
- **Temps réel**: Socket.io
- **Validation**: Zod
- **Icônes**: Lucide React, Heroicons

## Prérequis

- Node.js (v16 ou supérieur)
- PostgreSQL
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-nom/NonStopChat-Next.git
cd NonStopChat-Next
```

2. Installez les dépendances du projet principal :
```bash
npm install
# ou
yarn install
```

3. Installez les dépendances du serveur Socket.io :
```bash
cd server
npm install
# ou
yarn install
cd ..
```

4. Configurez les variables d'environnement :
   - Renommez le fichier `.env.example` en `.env` et modifiez les valeurs selon votre configuration PostgreSQL

5. Initialisez la base de données :
```bash
npx prisma migrate dev --name init
```

## Démarrage

1. Démarrez le serveur de développement Next.js :
```bash
npm run dev
# ou
yarn dev
```

2. Démarrez le serveur Socket.io (dans un autre terminal) :
```bash
cd server
npm run dev
# ou
yarn dev
```

3. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
NonStopChat-Next/
├── app/                    # Pages de l'application (App Router)
│   ├── api/                # Routes API
│   ├── chat/               # Page de chat
│   ├── login/              # Page de connexion
│   └── users/              # Page des utilisateurs
├── components/             # Composants React
│   ├── auth/               # Composants d'authentification
│   ├── chat/               # Composants de chat
│   ├── providers/          # Providers React
│   └── users/              # Composants utilisateurs
├── lib/                    # Utilitaires et configuration
├── prisma/                 # Configuration Prisma
├── public/                 # Fichiers statiques
│   └── uploads/            # Images téléchargées
├── server/                 # Serveur Socket.io
└── types/                  # Types TypeScript
```

## Licence

Ce projet est sous licence MIT.
# non_stop_chat
