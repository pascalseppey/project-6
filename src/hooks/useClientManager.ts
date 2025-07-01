import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { setAvailableClients, setLastActiveClient, addClient } from '../store/slices/clientsSlice';
import { setCurrentClient, setLoading, setError, clearCurrentClient } from '../store/slices/currentClientSlice';
import { addNotification } from '../store/slices/uiSlice';
import type { ClientData, ClientMetadata } from '../store/slices/currentClientSlice';

export const useClientManager = () => {
  const dispatch = useAppDispatch();
  const { availableClients, lastActiveClientId } = useAppSelector(state => state.clients);
  const { data: currentClient } = useAppSelector(state => state.currentClient);
  
  // Charger la liste des clients disponibles
  const loadAvailableClients = async () => {
    try {
      // Simuler le chargement depuis le serveur/dossier
      // En réalité, cela ferait un appel API pour lister les fichiers JSON
      const mockClients: ClientMetadata[] = [
        {
          id: 'client-001',
          nom: 'Charly Gaillard SARL',
          email: 'contact@charlygaillard.ch',
          createdAt: '2024-01-15T10:00:00Z',
          lastModified: '2025-01-01T15:30:00Z'
        },
        {
          id: 'client-002',
          nom: 'TechStart Innovation',
          email: 'hello@techstart.ch',
          createdAt: '2024-03-20T14:30:00Z',
          lastModified: '2024-12-28T09:15:00Z'
        },
        {
          id: 'client-003',
          nom: 'Digital Solutions SA',
          email: 'info@digitalsolutions.ch',
          createdAt: '2024-06-10T11:45:00Z',
          lastModified: '2024-12-30T16:20:00Z'
        }
      ];
      
      dispatch(setAvailableClients(mockClients));
      
      // Charger le dernier client actif depuis localStorage
      const savedLastActive = localStorage.getItem('beezia-last-active-client');
      if (savedLastActive && mockClients.find(c => c.id === savedLastActive)) {
        await loadClient(savedLastActive);
      } else if (mockClients.length > 0) {
        // Charger le premier client par ordre alphabétique
        const sortedClients = [...mockClients].sort((a, b) => a.nom.localeCompare(b.nom));
        await loadClient(sortedClients[0].id);
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
      
      dispatch(addNotification({
        type: 'success',
        message: `Client "${clientData.metadata.nom}" chargé avec succès`
      }));
      
    } catch (error) {
      console.error('Erreur chargement client:', error);
      dispatch(setError('Erreur lors du chargement du client'));
      dispatch(addNotification({
        type: 'error',
        message: 'Erreur lors du chargement du client'
      }));
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
      
      dispatch(addNotification({
        type: 'success',
        message: `Nouveau client "${nom}" créé avec succès`
      }));
      
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
    
    return {
      id: clientId,
      metadata: {
        nom: nom || clientMetadata?.nom || 'Nouveau Client',
        email: email || clientMetadata?.email || 'contact@example.com',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      data: {
        // Infos générales
        entreprise: {
          raisonSociale: nom || 'Nouvelle Entreprise',
          secteurActivite: 'Services',
          nombreEmployes: '1-5',
          anneeFondation: new Date().getFullYear().toString()
        },
        adn: {
          historique: '',
          presentation: ''
        },
        valeurs: [
          { title: 'Innovation', description: 'Nous restons à la pointe des technologies' },
          { title: 'Excellence', description: 'Qualité et professionnalisme dans chaque projet' },
          { title: 'Transparence', description: 'Communication claire et honnête' }
        ],
        cibles: [
          { title: 'PME', description: 'Petites et moyennes entreprises' },
          { title: 'Startups', description: 'Jeunes entreprises innovantes' }
        ],
        prestations: [
          { title: 'Développement Web', description: 'Sites web modernes et responsives' },
          { title: 'Marketing Digital', description: 'Stratégies SEO et réseaux sociaux' }
        ],
        
        // Design & Branding
        logo: {
          nom: 'Logo Principal',
          description: 'Logo moderne et épuré',
          formats: ['PNG', 'SVG', 'PDF'],
          couleurs: 'Bleu et Blanc',
          usage: 'Site web, documents officiels'
        },
        couleurs: [
          { nom: 'Bleu Principal', hex: '#2563eb', usage: 'Couleur principale', ordre: 1 },
          { nom: 'Gris Neutre', hex: '#6b7280', usage: 'Textes secondaires', ordre: 2 }
        ],
        typographies: [
          { nom: 'Inter Bold', famille: 'Inter', usage: 'titre', taille: '32px', poids: '700' },
          { nom: 'Inter Regular', famille: 'Inter', usage: 'texte', taille: '16px', poids: '400' }
        ],
        
        // Réseaux sociaux
        reseaux: [
          {
            id: '1',
            nom: nom || 'Entreprise',
            plateforme: 'LinkedIn',
            lien: '',
            followers: 0,
            postsParSemaine: 2,
            actif: true
          }
        ],
        strategie: {
          objectifs: 'Augmenter la visibilité et attirer de nouveaux clients',
          cibleAudience: 'PME et entrepreneurs',
          tonalite: 'Professionnel mais accessible',
          frequenceGlobale: '5 posts par semaine',
          themesContenu: 'Expertise métier, conseils, actualités',
          kpis: 'Croissance followers +10%/mois, engagement >3%'
        },
        
        // Localisation
        fichesList: [
          {
            id: '1',
            nom: 'Siège',
            commune: '',
            infos: {
              nomFiche: nom || 'Nouvelle Entreprise',
              categorie: 'Services',
              description: '',
              lien: ''
            },
            contact: {
              siteWeb: '',
              telephone: '',
              commune: '',
              adresse: '',
              canton: ''
            },
            avis: [],
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
        
        // Concurrents
        prestationsConcurrentielles: [
          {
            nom: 'Services Généraux',
            description: 'Analyse concurrentielle générale',
            concurrents: []
          }
        ],
        
        // Plan de site
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
            name: 'Services',
            slug: '/services',
            level: 1,
            type: 'page',
            isFixed: false,
            order: 1,
          },
          {
            id: '3',
            name: 'Contact',
            slug: '/contact',
            level: 1,
            type: 'page',
            isFixed: false,
            order: 2,
          }
        ],
        
        // SEO
        seoPages: {
          '1': {
            pageId: '1',
            title: `${nom || 'Entreprise'} - Accueil`,
            metaDescription: 'Page d\'accueil de notre entreprise',
            h1: `Bienvenue chez ${nom || 'Notre Entreprise'}`,
            keywords: ['accueil', 'entreprise'],
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