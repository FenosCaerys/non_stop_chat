const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialiser Socket.io
  const io = new Server(server);

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
      const { senderId, recipientId } = data;
      
      // Vérifier si le destinataire est connecté
      const recipientSocketId = userSockets.get(recipientId);
      
      if (recipientSocketId) {
        // Envoyer une notification au destinataire
        io.to(recipientSocketId).emit('receive_message', {
          senderId,
          recipientId
        });
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

  const PORT = process.env.PORT || 3000;
  
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Serveur prêt sur http://localhost:${PORT}`);
  });
});
