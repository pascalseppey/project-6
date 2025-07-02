# 🚀 Serveur BeeziaAnalytics

## Installation et démarrage

```bash
cd server
npm install
npm run dev
```

## Endpoints disponibles

- `GET /api/beezia/health` - Test de connexion
- `POST /api/beezia/pre-analyze` - Pré-analyse d'un site
- `POST /api/beezia/confirm-analysis` - Démarrer l'analyse

## WebSocket Events

- `analysis-progress` - Progression en temps réel
- `analysis-complete` - Analyse terminée

## Variables d'environnement

Le serveur écoute sur le port 3005 par défaut.