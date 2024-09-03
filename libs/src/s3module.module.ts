import { Module } from '@nestjs/common';
import { S3moduleService } from './s3module.service';

@Module({
  providers: [S3moduleService],
  exports: [S3moduleService],
})
export class S3moduleModule {}
