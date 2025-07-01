import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types pour les données client
export interface EntrepriseData {
  raisonSociale: string;
  secteurActivite: string;
  nombreEmployes: string;
  anneeFondation: string;
}

export interface AdnData {
  historique: string;
  presentation: string;
}

export interface ValeurData {
  title: string;
  description: string;
}

export interface CibleData {
  title: string;
  description: string;
}

export interface PrestationData {
  title: string;
  description: string;
}

export interface ReseauSocial {
  id: string;
  nom: string;
  plateforme: string;
  lien: string;
  followers: number;
  postsParSemaine: number;
  actif: boolean;
}

export interface StrategieData {
  objectifs: string;
  cibleAudience: string;
  tonalite: string;
  frequenceGlobale: string;
  themesContenu: string;
  kpis: string;
}

export interface GMBFiche {
  id: string;
  nom: string;
  commune: string;
  infos: {
    nomFiche: string;
    categorie: string;
    description: string;
    lien: string;
  };
  contact: {
    siteWeb: string;
    telephone: string;
    commune: string;
    adresse: string;
    canton: string;
  };
  avis: Array<{
    nom: string;
    prenom: string;
    date: string;
    note: number;
    commentaire: string;
  }>;
  horaires: Array<{
    jour: string;
    ouvert: boolean;
    heureOuverture: string;
    heureFermeture: string;
  }>;
  joursFeries: Array<{
    nom: string;
    date: string;
    ferme: boolean;
    horaireSpecial: string;
  }>;
}

export interface Concurrent {
  id: string;
  nom: string;
  siteWeb: string;
  description: string;
  scores: {
    qualite: number;
    prix: number;
    delais: number;
    service: number;
    innovation: number;
    reputation: number;
    portfolio: number;
    communication: number;
  };
  scoreTotal: number;
  classement: number;
}

export interface PrestationConcurrentielle {
  nom: string;
  description: string;
  concurrents: Concurrent[];
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  level: 1 | 2 | 3;
  type: 'home' | 'page';
  isFixed: boolean;
  parentId?: string;
  order: number;
}

export interface ContentBlock {
  id: string;
  type: 'container' | 'text' | 'image';
  content?: string;
  imageUrl?: string;
  children?: ContentBlock[];
  parentId?: string;
  order: number;
  columns?: number;
}

export interface PageSEOData {
  pageId: string;
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  content: ContentBlock[];
}

export interface ClientData {
  id: string;
  metadata: {
    nom: string;
    email: string;
    createdAt: string;
    lastModified: string;
  };
  data: {
    // Infos générales
    entreprise: EntrepriseData;
    adn: AdnData;
    valeurs: ValeurData[];
    cibles: CibleData[];
    prestations: PrestationData[];
    
    // Design & Branding
    logo: {
      nom: string;
      description: string;
      formats: string[];
      couleurs: string;
      usage: string;
    };
    couleurs: Array<{
      nom: string;
      hex: string;
      usage: string;
      ordre: number;
    }>;
    typographies: Array<{
      nom: string;
      famille: string;
      usage: 'titre' | 'texte';
      taille: string;
      poids: string;
    }>;
    
    // Réseaux sociaux
    reseaux: ReseauSocial[];
    strategie: StrategieData;
    
    // Localisation
    fichesList: GMBFiche[];
    
    // Concurrents
    prestationsConcurrentielles: PrestationConcurrentielle[];
    
    // Plan de site
    pages: Page[];
    
    // SEO
    seoPages: { [key: string]: PageSEOData };
  };
}

interface CurrentClientState {
  data: ClientData | null;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: string | null;
  hasUnsavedChanges: boolean;
  error: string | null;
}

const initialState: CurrentClientState = {
  data: null,
  isLoading: false,
  isSaving: false,
  lastSaved: null,
  hasUnsavedChanges: false,
  error: null
};

const currentClientSlice = createSlice({
  name: 'currentClient',
  initialState,
  reducers: {
    setCurrentClient: (state, action: PayloadAction<ClientData>) => {
      state.data = action.payload;
      state.hasUnsavedChanges = false;
      state.error = null;
    },
    
    updateClientData: (state, action: PayloadAction<{ path: string; value: any }>) => {
      if (!state.data) return;
      
      const { path, value } = action.payload;
      const pathArray = path.split('.');
      
      // Navigation dans l'objet pour mettre à jour la valeur
      let current: any = state.data;
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;
      
      // Marquer comme modifié
      state.hasUnsavedChanges = true;
      if (state.data.metadata) {
        state.data.metadata.lastModified = new Date().toISOString();
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    
    setSaved: (state) => {
      state.hasUnsavedChanges = false;
      state.lastSaved = new Date().toISOString();
      state.isSaving = false;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    syncFromOtherTab: (state, action: PayloadAction<ClientData>) => {
      // Synchroniser depuis un autre onglet seulement si pas de changements locaux
      if (!state.hasUnsavedChanges) {
        state.data = action.payload;
      }
    },
    
    clearCurrentClient: (state) => {
      state.data = null;
      state.hasUnsavedChanges = false;
      state.lastSaved = null;
      state.error = null;
    }
  }
});

export const {
  setCurrentClient,
  updateClientData,
  setLoading,
  setSaving,
  setSaved,
  setError,
  syncFromOtherTab,
  clearCurrentClient
} = currentClientSlice.actions;

export default currentClientSlice.reducer;