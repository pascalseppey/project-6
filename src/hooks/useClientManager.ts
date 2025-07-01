import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { setAvailableClients, setLastActiveClient, addClient } from '../store/slices/clientsSlice';
import { setCurrentClient, setLoading, setError, clearCurrentClient } from '../store/slices/currentClientSlice';
import type { ClientData, ClientMetadata } from '../store/slices/currentClientSlice';

export const useClientManager = () => {
  const dispatch = useAppDispatch();
  const { availableClients, lastActiveClientId } = useAppSelector(state => state.clients);
  const { data: currentClient } = useAppSelector(state => state.currentClient);
  
  // Charger la liste des clients disponibles
  const loadAvailableClients = async () => {
    try {
      // Supprimer tous les anciens clients du localStorage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('beezia-client-') || key === 'beezia-last-active-client') {
          localStorage.removeItem(key);
        }
      });
      
      // Créer 3 nouveaux clients avec données complètes
      const mockClients: ClientMetadata[] = [
        {
          id: 'client-001',
          nom: 'Entreprise Alpha SA',
          email: 'contact@alpha.ch',
          createdAt: '2024-01-15T10:00:00Z',
          lastModified: '2025-01-01T15:30:00Z'
        },
        {
          id: 'client-002',
          nom: 'Beta Solutions SARL',
          email: 'info@beta.ch',
          createdAt: '2024-03-20T14:30:00Z',
          lastModified: '2024-12-28T09:15:00Z'
        },
        {
          id: 'client-003',
          nom: 'Gamma Consulting SA',
          email: 'hello@gamma.ch',
          createdAt: '2024-06-10T11:45:00Z',
          lastModified: '2024-12-30T16:20:00Z'
        }
      ];
      
      // Créer les données complètes pour chaque client
      for (const client of mockClients) {
        const clientData = createDefaultClientData(client.id, client.nom, client.email);
        localStorage.setItem(`beezia-client-${client.id}`, JSON.stringify(clientData));
      }
      
      dispatch(setAvailableClients(mockClients));
      
      // Charger le premier client par défaut
      if (mockClients.length > 0) {
        await loadClient(mockClients[0].id);
      }
      
    } catch (error) {
      console.error('Erreur chargement clients:', error);
      dispatch(setError('Erreur lors du chargement des clients'));
    }
  };
  
  // Charger un client spécifique
  const loadClient = async (clientId: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearCurrentClient());
      
      // Essayer de charger depuis localStorage d'abord
      const savedData = localStorage.getItem(`beezia-client-${clientId}`);
      
      let clientData: ClientData;
      
      if (savedData) {
        clientData = JSON.parse(savedData);
      } else {
        // Créer des données par défaut pour le client
        clientData = createDefaultClientData(clientId);
        
        // Sauvegarder les données par défaut
        localStorage.setItem(`beezia-client-${clientId}`, JSON.stringify(clientData));
      }
      
      dispatch(setCurrentClient(clientData));
      dispatch(setLastActiveClient(clientId));
      localStorage.setItem('beezia-last-active-client', clientId);
      
      console.log('✅ Client chargé:', clientData.metadata.nom);
      
    } catch (error) {
      console.error('Erreur chargement client:', error);
      dispatch(setError('Erreur lors du chargement du client'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Créer un nouveau client
  const createNewClient = async (nom: string, email: string) => {
    try {
      const clientId = `client-${Date.now()}`;
      const clientData = createDefaultClientData(clientId, nom, email);
      
      // Sauvegarder le nouveau client
      localStorage.setItem(`beezia-client-${clientId}`, JSON.stringify(clientData));
      
      // Ajouter à la liste des clients disponibles
      dispatch(addClient(clientData.metadata));
      
      // Charger le nouveau client
      await loadClient(clientId);
      
      console.log('✅ Nouveau client créé:', nom);
      
      return clientId;
      
    } catch (error) {
      console.error('Erreur création client:', error);
      dispatch(setError('Erreur lors de la création du client'));
      throw error;
    }
  };
  
  // Créer des données par défaut pour un client
  const createDefaultClientData = (clientId: string, nom?: string, email?: string): ClientData => {
    const clientMetadata = availableClients.find(c => c.id === clientId);
    const clientName = nom || clientMetadata?.nom || 'waiting_for_data';
    
    // Générer 10 concurrents par prestation avec scores calculés
    const generateConcurrents = (prestationName: string) => {
      const concurrents = [];
      for (let i = 1; i <= 10; i++) {
        const scores = {
          qualite: Math.floor(Math.random() * 10) + 1,
          prix: Math.floor(Math.random() * 10) + 1,
          delais: Math.floor(Math.random() * 10) + 1,
          service: Math.floor(Math.random() * 10) + 1,
          innovation: Math.floor(Math.random() * 10) + 1,
          reputation: Math.floor(Math.random() * 10) + 1,
          portfolio: Math.floor(Math.random() * 10) + 1,
          communication: Math.floor(Math.random() * 10) + 1
        };
        
        const scoreTotal = Object.values(scores).reduce((sum, score) => sum + score, 0);
        
        concurrents.push({
          id: `concurrent-${prestationName}-${i}`,
          nom: `Concurrent ${i} ${prestationName}`,
          siteWeb: `https://concurrent${i}-${prestationName.toLowerCase().replace(/\s+/g, '')}.ch`,
          description: 'waiting_for_data',
          scores,
          scoreTotal,
          classement: 0 // Sera calculé après tri
        });
      }
      
      // Trier par score total et assigner les classements
      concurrents.sort((a, b) => b.scoreTotal - a.scoreTotal);
      concurrents.forEach((concurrent, index) => {
        concurrent.classement = index + 1;
      });
      
      return concurrents;
    };
    
    return {
      id: clientId,
      metadata: {
        nom: clientName,
        email: email || clientMetadata?.email || 'waiting_for_data@example.com',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      data: {
        // Infos générales
        entreprise: {
          raisonSociale: clientName,
          secteurActivite: 'waiting_for_data',
          nombreEmployes: '1-5',
          anneeFondation: new Date().getFullYear().toString()
        },
        adn: {
          historique: 'waiting_for_data',
          presentation: 'waiting_for_data'
        },
        valeurs: [
          { title: 'waiting_for_data', description: 'waiting_for_data' },
          { title: 'waiting_for_data', description: 'waiting_for_data' },
          { title: 'waiting_for_data', description: 'waiting_for_data' }
        ],
        cibles: [
          { title: 'waiting_for_data', description: 'waiting_for_data' },
          { title: 'waiting_for_data', description: 'waiting_for_data' }
        ],
        prestations: [
          { title: 'waiting_for_data', description: 'waiting_for_data' },
          { title: 'waiting_for_data', description: 'waiting_for_data' }
        ],
        
        // Design & Branding
        logo: {
          nom: 'waiting_for_data',
          description: 'waiting_for_data',
          formats: ['PNG', 'SVG', 'PDF'],
          couleurs: 'waiting_for_data',
          usage: 'waiting_for_data'
        },
        couleurs: [
          { nom: 'Noir', hex: '#000000', usage: 'waiting_for_data', ordre: 1 }
        ],
        typographies: [
          { nom: 'Arial Bold', famille: 'Arial', usage: 'titre', taille: '32px', poids: '700' },
          { nom: 'Arial Regular', famille: 'Arial', usage: 'texte', taille: '16px', poids: '400' }
        ],
        
        // Réseaux sociaux
        reseaux: [
          {
            id: '1',
            nom: clientName,
            plateforme: 'Facebook',
            lien: 'waiting_for_data',
            followers: 0,
            postsParSemaine: 2,
            actif: true
          },
          {
            id: '2',
            nom: clientName,
            plateforme: 'LinkedIn',
            lien: 'waiting_for_data',
            followers: 0,
            postsParSemaine: 3,
            actif: true
          },
          {
            id: '3',
            nom: clientName,
            plateforme: 'Instagram',
            lien: 'waiting_for_data',
            followers: 0,
            postsParSemaine: 4,
            actif: true
          }
        ],
        strategie: {
          objectifs: '',
          cibleAudience: '',
          tonalite: '',
          frequenceGlobale: '',
          themesContenu: '',
          kpis: ''
        },
        
        // Localisation
        fichesList: [
          {
            id: '1',
            nom: 'waiting_for_data',
            commune: 'waiting_for_data',
            infos: {
              nomFiche: clientName,
              categorie: 'waiting_for_data',
              description: 'waiting_for_data',
              lien: 'waiting_for_data'
            },
            contact: {
              siteWeb: 'waiting_for_data',
              telephone: 'waiting_for_data',
              commune: 'waiting_for_data',
              adresse: 'waiting_for_data',
              canton: 'Vaud'
            },
            avis: [
              {
                nom: 'Dupont',
                prenom: 'Jean',
                date: '2024-12-01',
                note: 5,
                commentaire: 'waiting_for_data'
              },
              {
                nom: 'Martin',
                prenom: 'Marie',
                date: '2024-12-15',
                note: 4,
                commentaire: 'waiting_for_data'
              },
              {
                nom: 'Bernard',
                prenom: 'Pierre',
                date: '2024-12-20',
                note: 5,
                commentaire: 'waiting_for_data'
              }
            ],
            horaires: [
              { jour: 'Lundi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
              { jour: 'Mardi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
              { jour: 'Mercredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
              { jour: 'Jeudi', ouvert: true, heureOuverture: '09:00', heureFermeture: '18:00' },
              { jour: 'Vendredi', ouvert: true, heureOuverture: '09:00', heureFermeture: '17:00' },
              { jour: 'Samedi', ouvert: false, heureOuverture: '', heureFermeture: '' },
              { jour: 'Dimanche', ouvert: false, heureOuverture: '', heureFermeture: '' }
            ],
            joursFeries: [
              { nom: 'Nouvel An', date: '2025-01-01', ferme: true, horaireSpecial: '' },
              { nom: 'Fête du Travail', date: '2025-05-01', ferme: true, horaireSpecial: '' },
              { nom: 'Fête Nationale', date: '2025-08-01', ferme: true, horaireSpecial: '' },
              { nom: 'Noël', date: '2025-12-25', ferme: true, horaireSpecial: '' }
            ]
          }
        ],
        
        // Concurrents - 6 prestations avec 10 concurrents chacune
        prestationsConcurrentielles: [
          {
            nom: 'Prestation 1',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 1')
          },
          {
            nom: 'Prestation 2',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 2')
          },
          {
            nom: 'Prestation 3',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 3')
          },
          {
            nom: 'Prestation 4',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 4')
          },
          {
            nom: 'Prestation 5',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 5')
          },
          {
            nom: 'Prestation 6',
            description: 'waiting_for_data',
            concurrents: generateConcurrents('Prestation 6')
          }
        ],
        
        // Plan de site - Structure standard
        pages: [
          {
            id: '1',
            name: 'Accueil',
            slug: '/accueil',
            level: 1,
            type: 'home',
            isFixed: true,
            order: 0,
          },
          {
            id: '2',
            name: 'Prestations',
            slug: '/prestations',
            level: 1,
            type: 'page',
            isFixed: false,
            order: 1,
          },
          {
            id: '3',
            name: 'Prestation 1',
            slug: '/prestations/prestation-1',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 2,
          },
          {
            id: '4',
            name: 'Prestation 2',
            slug: '/prestations/prestation-2',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 3,
          },
          {
            id: '5',
            name: 'Prestation 3',
            slug: '/prestations/prestation-3',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 4,
          },
          {
            id: '6',
            name: 'Prestation 4',
            slug: '/prestations/prestation-4',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 5,
          },
          {
            id: '7',
            name: 'Prestation 5',
            slug: '/prestations/prestation-5',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 6,
          },
          {
            id: '8',
            name: 'Prestation 6',
            slug: '/prestations/prestation-6',
            level: 2,
            type: 'page',
            isFixed: false,
            order: 7,
          },
          {
            id: '9',
            name: 'À propos',
            slug: '/a-propos',
            level: 1,
            type: 'page',
            isFixed: false,
            order: 8,
          },
          {
            id: '10',
            name: 'Contact',
            slug: '/contact',
            level: 1,
            type: 'page',
            isFixed: false,
            order: 9,
          }
        ],
        
        // SEO
        seoPages: {
          '1': {
            pageId: '1',
            title: `${clientName} - waiting_for_data`,
            metaDescription: 'waiting_for_data',
            h1: `waiting_for_data`,
            keywords: ['waiting_for_data'],
            content: []
          }
        }
      }
    };
  };
  
  // Charger les clients au démarrage
  useEffect(() => {
    loadAvailableClients();
  }, []);
  
  return {
    availableClients,
    currentClient,
    lastActiveClientId,
    loadClient,
    createNewClient,
    loadAvailableClients
  };
};