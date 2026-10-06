# Devisio API — première étape

Socle du backend Devisio : NestJS 11, TypeScript strict, Prisma 7 et PostgreSQL.
Le frontend utilisera le port 3000 ; cette API utilise le port 3001.

## Ce qui est prêt

- Configuration `.env` vérifiée au démarrage.
- Connexion PostgreSQL avec un service Prisma injectable.
- Modèle `Client` et migration initiale.
- Route `GET /health` pour vérifier le démarrage de l'API.
- Validation des futures requêtes et CORS pour le frontend local.

Le CRUD clients, les devis, les factures et l'authentification sont les prochaines
étapes. Ce socle est prévu pour le développement local : avant de l'ouvrir à des
utilisateurs, il faudra ajouter les comptes, les entreprises et l'isolation de
leurs données.

## Lancer sur ton ordinateur

Prérequis : Node.js 22.12+ (ou 24+) et Docker Desktop si tu utilises la base fournie.
Dans le terminal :

```bash
git clone https://github.com/said-oumakhlouf/devisio-api.git
cd devisio-api
cp .env.example .env
npm ci
docker compose up -d --wait
npm run db:deploy
npm run start:dev
```

Ouvre ensuite <http://localhost:3001/health>. Résultat attendu :

```json
{ "status": "ok", "service": "devisio-api" }
```

La génération Prisma est lancée automatiquement avant le démarrage en développement
et avant la compilation. Le fichier `.env` reste local ; il est exclu de Git.

### Si PostgreSQL est déjà installé

Tu peux ignorer `docker compose up`. Crée une base séparée `devisio` puis remplace
`DATABASE_URL` dans `.env` par tes identifiants, ton port et le nom de cette base.
Ne réutilise pas la base CONNECTA.

La base Docker utilise le port **5433**, pour éviter de gêner PostgreSQL sur 5432.
Si ce port est déjà occupé, modifie le port dans `compose.yaml` et dans `.env`.

### Arrêter la base

```bash
docker compose stop
```

Les données sont conservées dans un volume Docker.

## Comprendre les fichiers

| Fichier                        | Rôle                                             |
| ------------------------------ | ------------------------------------------------ |
| `src/main.ts`                  | Démarrage, port, CORS et validation des requêtes |
| `src/app.module.ts`            | Assemblage des modules                           |
| `src/prisma/prisma.service.ts` | Connexion à PostgreSQL et accès Prisma           |
| `prisma/schema.prisma`         | Modèle des données                               |
| `prisma.config.ts`             | Configuration de la CLI Prisma 7                 |
| `.env.example`                 | Exemple de configuration locale                  |

## Le modèle Client

```prisma
model Client {
  id        Int      @id @default(autoincrement())
  name      String
  email     String?
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

`id` identifie le client. `name` est obligatoire ; `?` rend `email` et `phone`
facultatifs. `createdAt` est rempli à la création ; `updatedAt` est maintenu par
Prisma à chaque modification.

## Prochaine étape à coder ensemble

Créer un module `ClientsModule`, un DTO `CreateClientDto`, puis un service et un
contrôleur pour **POST /clients** et **GET /clients**. Le service injectera
`PrismaService` pour enregistrer et lire les clients.

Pour une future modification du schéma :

```bash
npm run db:migrate -- --name nom_de_la_modification
npm run prisma:generate
```

## Vérifications

```bash
npm run prisma:validate
npm run typecheck
npm test
npm run format:check
```

`npm test` compile le projet puis vérifie les paramètres de configuration.
La route `/health` indique que l'API répond ; elle ne constitue pas un contrôle
continu de la disponibilité de PostgreSQL.

À la création du projet, le schéma Prisma, la compilation et les tests de
configuration ont été vérifiés. La migration, l'écriture et la lecture d'un client,
le démarrage de l'API et le CORS ont aussi été vérifiés sur un moteur PostgreSQL
temporaire via PGlite. Le lancement Docker sur ton ordinateur reste à effectuer.

## Commits suivants

Le socle est déjà enregistré sur GitHub. Après chaque fonctionnalité terminée et
vérifiée :

```bash
git add .
git commit -m "feat: add clients endpoints"
git push
```

Adapte le message à la fonctionnalité ajoutée. Les dépendances, le code généré et
`.env` sont ignorés.

## Références

- [Intégration NestJS et Prisma](https://docs.nestjs.com/recipes/prisma)
- [Prisma ORM 7](https://docs.prisma.io/docs/guides/upgrade-prisma-orm/v7)
