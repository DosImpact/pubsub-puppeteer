import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Version } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(
    @InjectQueue('audio')
    private readonly audioQueue: Queue,
  ) {}

  @Version('1')
  @Get('transcode')
  async transcode() {
    const result = await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    });

    return {
      ok: true,
      id: result.id,
    };
  }
}
