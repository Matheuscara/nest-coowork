import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors(
    {
      origin: 'http://localhost:4200',
      credentials: true,
    },
  );

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:4200',
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
