import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
const sleep = async (ms: number) => new Promise((res) => setTimeout(res, ms));

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger();
  @Process('transcode')
  async handleTranscode(job: Job) {
    this.logger.verbose('transcode start...', job.data);
    await sleep(1000);
    this.logger.verbose('✔ transcode end');
  } // event-listeners 프로세스의 이벤트가 실행되면 정보 출력

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.verbose(
      `[onActive]Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  // event-listeners 프로세스의 이벤트가 종료  출력
  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.verbose(
      `[onCompleted]Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
