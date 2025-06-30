const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Stocker les connexions utilisateurs
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté:', socket.id);
  
  // Récupérer l'ID utilisateur depuis les paramètres de requête
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    // Associer l'ID socket à l'ID utilisateur
    userSockets.set(userId, socket.id);
    console.log(`Utilisateur ${userId} associé au socket ${socket.id}`);
  }

  // Écouter les nouveaux messages
  socket.on('new_message', (data) => {
    const { senderId, recipientId, message } = data;
    
    // Vérifier si le destinataire est connecté
    const recipientSocketId = userSockets.get(recipientId);
    
    if (recipientSocketId) {
      // Envoyer le message complet au destinataire
      io.to(recipientSocketId).emit('receive_message', {
        senderId,
        recipientId,
        message
      });
      
      console.log(`Message envoyé de ${senderId} à ${recipientId}`);
    } else {
      console.log(`Destinataire ${recipientId} non connecté`);
    }
  });

  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté:', socket.id);
    
    // Supprimer l'association utilisateur-socket
    if (userId) {
      userSockets.delete(userId);
      console.log(`Association supprimée pour l'utilisateur ${userId}`);
    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io démarré sur le port ${PORT}`);
});
