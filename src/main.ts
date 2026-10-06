import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({ origin: config.getOrThrow<string>('CORS_ORIGIN') });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  const port = config.getOrThrow<number>('PORT');
  await app.listen(port, '127.0.0.1');
  Logger.log(`Devisio API : http://localhost:${port}/health`, 'Bootstrap');
}

void bootstrap().catch((error: unknown) => {
  // Ne pas afficher la configuration ni les identifiants de connexion.
  Logger.error(
    error instanceof Error ? error.message : 'Échec du démarrage.',
    undefined,
    'Bootstrap',
  );
  process.exitCode = 1;
});
