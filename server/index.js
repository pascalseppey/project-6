import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/beezia/health', (req, res) => {
  res.json({ status: 'ok', message: 'BeeziaAnalytics server is running' });
});

// Pré-analyse endpoint
app.post('/api/beezia/pre-analyze', async (req, res) => {
  const { url } = req.body;
  
  console.log(`🔍 Pré-analyse de: ${url}`);
  
  // Simuler la détection de pages et fiches GMB
  const pageCount = Math.floor(Math.random() * 20) + 5; // 5-25 pages
  const gmbCount = Math.floor(Math.random() * 3) + 1;   // 1-3 fiches GMB
  const estimatedTime = (pageCount * 2) + (gmbCount * 5); // estimation en secondes
  
  const data = {
    url,
    pageCount,
    gmbCount,
    estimatedTimeFormatted: `${Math.ceil(estimatedTime / 60)} minutes`
  };
  
  res.json({ 
    success: true, 
    data 
  });
});

// Confirmer et démarrer l'analyse
app.post('/api/beezia/confirm-analysis', async (req, res) => {
  const { url, pageCount, gmbCount } = req.body;
  
  console.log(`🚀 Démarrage analyse de: ${url}`);
  console.log(`📄 Pages: ${pageCount}, 🏢 GMB: ${gmbCount}`);
  
  res.json({ 
    success: true, 
    message: 'Analyse démarrée' 
  });
  
  // Démarrer l'analyse simulée
  startAnalysisSimulation(url, pageCount, gmbCount);
});

// Simulation d'analyse avec progression temps réel
function startAnalysisSimulation(url, pageCount, gmbCount) {
  const totalSteps = 100;
  let currentStep = 0;
  
  const progress = {
    website: 0,
    corporateId: 0,
    gmb: 0,
    reviews: 0
  };
  
  const interval = setInterval(() => {
    currentStep += Math.random() * 3 + 1; // Progression aléatoire
    
    // Progression séquentielle des étapes
    if (currentStep <= 25) {
      // Étape 1: Site Web
      progress.website = Math.min(100, (currentStep / 25) * 100);
    } else if (currentStep <= 50) {
      // Étape 2: Corporate ID
      progress.website = 100;
      progress.corporateId = Math.min(100, ((currentStep - 25) / 25) * 100);
    } else if (currentStep <= 75) {
      // Étape 3: GMB
      progress.website = 100;
      progress.corporateId = 100;
      progress.gmb = Math.min(100, ((currentStep - 50) / 25) * 100);
    } else {
      // Étape 4: Avis clients
      progress.website = 100;
      progress.corporateId = 100;
      progress.gmb = 100;
      progress.reviews = Math.min(100, ((currentStep - 75) / 25) * 100);
    }
    
    // Envoyer la progression via WebSocket
    io.emit('analysis-progress', {
      details: progress,
      currentStep: getCurrentStepName(currentStep),
      isComplete: currentStep >= 100
    });
    
    console.log(`📊 Progression: ${Math.round(currentStep)}%`, progress);
    
    // Terminer l'analyse
    if (currentStep >= 100) {
      clearInterval(interval);
      
      setTimeout(() => {
        io.emit('analysis-complete', {
          url,
          results: {
            pagesAnalyzed: pageCount,
            gmbAnalyzed: gmbCount,
            totalTime: '2 minutes 30 secondes'
          }
        });
        console.log(`✅ Analyse terminée pour: ${url}`);
      }, 1000);
    }
  }, 200); // Mise à jour toutes les 200ms
}

function getCurrentStepName(step) {
  if (step <= 25) return 'website';
  if (step <= 50) return 'corporateId';
  if (step <= 75) return 'gmb';
  return 'reviews';
}

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('👤 Client connecté:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('👋 Client déconnecté:', socket.id);
  });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`🚀 Serveur BeeziaAnalytics démarré sur http://localhost:${PORT}`);
  console.log(`🔌 WebSocket disponible sur ws://localhost:${PORT}`);
});