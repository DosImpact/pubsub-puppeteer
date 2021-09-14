import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    BullModule.registerQueue({
      name: 'audio',
      // processors: [join(__dirname, 'audio.processor.js')],
    }),
  ],
  controllers: [AudioController],
  providers: [AudioProcessor],
  exports: [],
})
export class AudioModule {
  private readonly logger = new Logger();
  constructor() {
    this.logger.verbose(
      `REDIS_API_CACHE_URL : ${process.env.REDIS_API_CACHE_URL}`,
    );
  }
}
