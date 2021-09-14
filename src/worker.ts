import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AudioModule } from './audio/audio.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT || 4000);
  // console.log('REDIS_API_CACHE_URL : ', process.env.REDIS_API_CACHE_URL);
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
bootstrap();
