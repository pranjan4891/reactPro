import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from '../schemas/logs.schema';
import { LogService } from './LogService';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [WinstonLoggerService, LogService],
  exports: [WinstonLoggerService],
})
export class LoggerModule {}
