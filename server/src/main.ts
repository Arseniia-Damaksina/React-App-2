import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://react-app-3a8p.onrender.com',
    ],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get('port');
  await app.listen(port || 3000);
}
bootstrap();
