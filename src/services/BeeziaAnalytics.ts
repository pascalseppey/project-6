import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface PreAnalysisData {
  url: string;
  pageCount: number;
  gmbCount: number;
  estimatedTimeFormatted: string;
}

interface AnalysisProgress {
  details: {
    website: number;
    corporateId: number;
    gmb: number;
    reviews: number;
  };
  currentStep: string;
  isComplete: boolean;
}

interface AnalysisCallbacks {
  onProgress?: (progress: AnalysisProgress) => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

class BeeziaAnalytics {
  private apiUrl: string;
  private wsUrl: string;
  private socket: Socket | null = null;
  private callbacks: AnalysisCallbacks = {};

  constructor() {
    this.apiUrl = '/api/beezia';
    this.wsUrl = window.location.origin;
  }

  async onLetsFightClick(siteUrl: string, callbacks: AnalysisCallbacks = {}): Promise<void> {
    this.callbacks = callbacks;
    
    try {
      // 1. Pré-analyse
      const preAnalysis = await axios.post(`${this.apiUrl}/pre-analyze`, { url: siteUrl });
      
      // 2. Afficher modal de confirmation avec les données
      const confirmed = await this.showConfirmationModal(preAnalysis.data.data);
      
      if (!confirmed) return;
      
      // 3. Démarrer l'analyse
      const { pageCount, gmbCount } = preAnalysis.data.data;
      await axios.post(`${this.apiUrl}/confirm-analysis`, { 
        url: siteUrl, 
        pageCount, 
        gmbCount 
      });
      
      // 4. Connecter WebSocket pour les mises à jour
      this.connectWebSocket();
      
    } catch (error: any) {
      console.error('Erreur BeeziaAnalytics:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erreur inconnue';
      
      if (this.callbacks.onError) {
        this.callbacks.onError(errorMessage);
      } else {
        alert(`Erreur: ${errorMessage}`);
      }
    }
  }
  
  private connectWebSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    
    this.socket = io(this.wsUrl);
    
    this.socket.on('connect', () => {
      console.log('✅ WebSocket connecté à BeeziaAnalytics');
    });
    
    this.socket.on('analysis-progress', (data: AnalysisProgress) => {
      console.log('📊 Progression reçue:', data);
      this.updateCircles(data);
    });
    
    this.socket.on('analysis-complete', () => {
      console.log('✅ Analyse terminée');
      if (this.callbacks.onComplete) {
        this.callbacks.onComplete();
      }
      this.disconnect();
    });
    
    this.socket.on('analysis-error', (error: string) => {
      console.error('❌ Erreur analyse:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      this.disconnect();
    });
    
    this.socket.on('disconnect', () => {
      console.log('🔌 WebSocket déconnecté');
    });
  }
  
  private updateCircles(progressData: AnalysisProgress): void {
    if (this.callbacks.onProgress) {
      this.callbacks.onProgress(progressData);
    }
  }
  
  private async showConfirmationModal(data: PreAnalysisData): Promise<boolean> {
    // Modal de confirmation simple (peut être remplacée par une modal React plus élégante)
    return confirm(`
Analyser ${data.url} ?

📄 ${data.pageCount} pages détectées
🏢 ${data.gmbCount} fiches Google My Business
⏱️ Temps estimé: ${data.estimatedTimeFormatted}

Voulez-vous continuer l'analyse ?
    `);
  }
  
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  // Méthode pour tester la connexion
  public async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.apiUrl}/health`);
      return response.status === 200;
    } catch (error) {
      console.error('❌ Test de connexion échoué:', error);
      return false;
    }
  }
}

export default BeeziaAnalytics;