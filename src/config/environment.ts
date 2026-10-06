export function validateEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const databaseUrl = config.DATABASE_URL;
  if (typeof databaseUrl !== 'string' || !databaseUrl.trim()) {
    throw new Error('DATABASE_URL est manquant. Copie .env.example vers .env.');
  }

  let parsedDatabaseUrl: URL;
  try {
    parsedDatabaseUrl = new URL(databaseUrl);
  } catch {
    throw new Error('DATABASE_URL doit être une URL PostgreSQL valide.');
  }
  if (
    !['postgres:', 'postgresql:'].includes(parsedDatabaseUrl.protocol) ||
    !parsedDatabaseUrl.hostname ||
    parsedDatabaseUrl.pathname.length <= 1
  ) {
    throw new Error(
      'DATABASE_URL doit indiquer un serveur et une base PostgreSQL.',
    );
  }

  const port = Number(config.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT doit être un entier entre 1 et 65535.');
  }

  const corsOrigin = config.CORS_ORIGIN ?? 'http://localhost:3000';
  if (typeof corsOrigin !== 'string') {
    throw new Error('CORS_ORIGIN doit être une origine HTTP valide.');
  }
  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(corsOrigin);
  } catch {
    throw new Error('CORS_ORIGIN doit être une origine HTTP valide.');
  }
  if (
    !['http:', 'https:'].includes(parsedOrigin.protocol) ||
    parsedOrigin.origin !== corsOrigin
  ) {
    throw new Error(
      'CORS_ORIGIN doit être une origine HTTP sans chemin ni slash final.',
    );
  }

  return {
    ...config,
    DATABASE_URL: databaseUrl,
    PORT: port,
    CORS_ORIGIN: corsOrigin,
  };
}
