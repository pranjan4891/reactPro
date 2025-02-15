import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly notFoundMessage: string = 'NOT_FOUND';

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const errorResponse = {
      success: false,
      data: null,
      exceptions: this.getExceptionMessage(exception),
      httpStatusCode: status,
      remarks: this.getRemarks(status, exception),
      msg: this.getMessage(status, exception),
      errors: this.getErrors(exception),
    };

    response.status(status).json(errorResponse);
  }

  private getRemarks(status: number, exception: any): string {
    if (status === 404) {
      return this.notFoundMessage;
    }
    if (exception instanceof HttpException) {
      const message = exception.getResponse()['message'];
      return message ? message.toUpperCase() : 'VALIDATION_FAILED';
    }
    return 'SERVER_ERROR';
  }

  private getMessage(status: number, exception: any): string {
    if (status === 404 && exception instanceof NotFoundException) {
      // Display the custom not found message if provided
      return exception.message || 'The resource was not found';
    }
    if (exception instanceof HttpException) {
      // Provide a more descriptive error message if available
      return exception.getResponse()['message'] || 'An error occurred';
    }
    return 'Internal server error';
  }

  private getErrors(exception: any): any {
    if (exception instanceof HttpException) {
      return exception.getResponse()['errors'] || null;
    }
    return null;
  }

  private getExceptionMessage(exception: any): string | null {
    if (exception instanceof InternalServerErrorException) {
      return exception.message || 'Internal server error occurred';
    }
    if (exception instanceof NotFoundException || exception instanceof HttpException) {
      return exception.message;
    }
    return null;
  }
}
