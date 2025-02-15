import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogService } from './LogService';
import * as jwt from 'jsonwebtoken';
import { LogDocument } from '../schemas/logs.schema';

@Injectable()
export class WinstonLoggerService implements NestLoggerService {
  private logger: winston.Logger;

  constructor(private readonly logService: LogService) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          // Format similar to the database entry
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          filename: 'logs/app-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          level: 'error',
          datePattern: 'DD-MM-YYYY',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  private extractUserIdFromJwt(token: string): string {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        user_id: string;
      };
      return decoded.user_id || 'system';
    } catch {
      return 'system';
    }
  }

  private getStackTraceInfo(): { file: string; line: string } {
    const stack = new Error().stack;
    if (stack) {
      const stackLines = stack.split('\n');
      const callerStackLine = stackLines[3];
      const match = callerStackLine.match(/\((.*):(\d+):\d+\)/);
      if (match) {
        return { file: match[1], line: match[2] };
      }
    }
    return { file: 'unknown', line: 'unknown' };
  }

  private async logMessage(
    level: 'info' | 'error' | 'warn' | 'debug' | 'verbose',
    message: string,
    token: string | null,
    trace?: string,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    const { file: logFile, line } = this.getStackTraceInfo();
    const user_id = this.extractUserIdFromJwt(token || '');
    const logMessage = trace
      ? `${message} - ${trace} (at ${logFile}:${line})`
      : `${message} (at ${logFile}:${line})`;

    // Log to console
    this.logger[level](logMessage);

    // Log the same formatted message to the file
    this.logger.log(level, logMessage); // Ensure it logs to the file as well

    // Save to DB
    await this.saveLogToDb(
      log_for,
      user_id,
      logFile,
      logMessage,
      log_for,
      level,
    );
  }

  private async saveLogToDb(
    log_for: string,
    user_id: string,
    file: string,
    message: string,
    log_level: string,
    log_type: string,
  ) {
    try {
      await this.logService.create({
        log_for,
        user_id,
        file,
        message,
        log_level,
        log_type,
        date: new Date(),
      });
    } catch (err) {
      console.error('Failed to save log to MongoDB', err);
    }
  }

  log(
    message: string,
    token: string | null = null,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    return this.logMessage('info', message, token, null, file, log_for);
  }

  error(
    message: string,
    trace?: string,
    token: string | null = null,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    return this.logMessage('error', message, token, trace, file, log_for);
  }

  warn(
    message: string,
    token: string | null = null,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    return this.logMessage('warn', message, token, null, file, log_for);
  }

  debug(
    message: string,
    token: string | null = null,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    return this.logMessage('debug', message, token, null, file, log_for);
  }

  verbose(
    message: string,
    token: string | null = null,
    file: string = '',
    log_for: string = 'application_level',
  ) {
    return this.logMessage('verbose', message, token, null, file, log_for);
  }
}
