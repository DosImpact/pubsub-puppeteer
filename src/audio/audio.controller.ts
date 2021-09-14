import { Controller, Get, Param } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(
    @InjectQueue('audio')
    private readonly audioQueue: Queue,
  ) {}

  @Get('transcode/check/:JobId')
  async transcodeCheck(@Param('JobId') JobId: string) {
    const job = await this.audioQueue.getJob(JobId);
    if (job === null) {
      return {
        ok: false,
        error: 'No JobId',
      };
    }
    return {
      ok: true,
      job,
    };
  }

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
