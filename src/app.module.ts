import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { AudioModule } from './audio/audio.module';
import { PuppeteerModule } from './puppeteer/puppeteer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        MAINTAINER: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    BullModule.forRoot({
      redis: process.env.REDIS_API_CACHE_URL,
    }),
    AudioModule,
    PuppeteerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
