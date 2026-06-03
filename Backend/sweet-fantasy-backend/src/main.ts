import { NestFactory } from '@nestjs/core';
import type { IncomingMessage, RequestListener, ServerResponse } from 'http';
import { AppModule } from './app.module';

let cachedServer: RequestListener | undefined;

async function createServer(): Promise<RequestListener> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://sweet-fantasy-vlas.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  await app.init();

  return app.getHttpAdapter().getInstance() as RequestListener;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  cachedServer ??= await createServer();
  return cachedServer(req, res);
}
