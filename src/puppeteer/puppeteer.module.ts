import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Module({
  controllers: [],
  exports: [],
  imports: [],
  providers: [PuppeteerService],
})
export class PuppeteerModule {}
