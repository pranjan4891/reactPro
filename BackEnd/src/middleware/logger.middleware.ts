import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLoggerService } from '../logger/winston-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
  }
}
