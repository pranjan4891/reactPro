import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { WinstonLoggerService } from './winston-logger.service'; // Adjust the import as necessary

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: WinstonLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Get the message and trace from the exception
    const message = exception.message;
    const trace = exception.getResponse();

    // Log the error with the status, message, and trace
    this.logger.error(`HTTP Exception: ${message}`, JSON.stringify(trace));

    // Prepare the error response object
    response.status(status).json({
      statusCode: status,
      message: message || 'An error occurred',  // Fallback if message is empty
      error: trace || 'Unknown error',  // Fallback if trace is empty
    });
  }
}
