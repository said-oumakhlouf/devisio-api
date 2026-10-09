# Devisio API — contexte court pour ChatGPT Work

## Projet
- Backend d'un futur SaaS de devis/facturation pour artisans.
- Stack : NestJS 11, TypeScript, Prisma 7, PostgreSQL ; Node.js 22.12+ ou 24+.
- API locale sur le port 3001 ; base Docker locale sur le port 5433 (distincte de CONNECTA).

## État constaté dans le code
- Socle : configuration d'environnement, Prisma, validation, CORS et `GET /health`.
- `ClientsModule` **existe déjà** (même si le README le présente encore comme une prochaine étape).
- Routes clients présentes : `GET /clients`, `POST /clients`, `GET /clients/:id`.
- Fichiers principaux : `src/clients/clients.controller.ts`, `src/clients/clients.service.ts`, `src/clients/dto/`, `src/prisma/`, `prisma/schema.prisma`.
- Devis, factures, authentification et isolation des données par entreprise : à concevoir/implémenter, ne pas les déclarer terminés.

## Commandes
- Démarrer : `npm run start:dev` ; Prisma : `npm run prisma:generate`, `npm run db:migrate`.
- Vérifications : `npm run typecheck`, `npm test`, `npm run prisma:validate`.
- Toujours utiliser une base dédiée à Devisio et garder `.env` hors de Git.

## Consignes Work
- Traiter une seule fonctionnalité à la fois ; consulter les fichiers liés à la tâche.
- Ne pas recréer le CRUD existant ; vérifier le code plutôt que supposer le README à jour.
- Pas de refactor global ni de migrations destructives non demandés.
- Finir par : fichiers changés, tests exécutés, limites et prochaine étape (5 lignes maximum).
- Mettre à jour ce résumé après une évolution significative effectivement livrée.
