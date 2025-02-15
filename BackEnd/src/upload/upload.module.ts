import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController], // Register the UploadController
})
export class UploadModule {}
