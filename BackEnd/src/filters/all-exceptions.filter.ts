import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let msg = this.getDefaultMessage(HttpStatus.INTERNAL_SERVER_ERROR); // Default message based on status code
    let remarks = 'RESPONSE_FAILED'; // Default remarks
    let exceptions: string | null = null; // Default to null if not provided
    let errors: any = null; // Default to null if not provided
    let data: any = null; // Default to null if data is not found
    let success = false; // Default success to false in case of error

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Special handling for 401 Unauthorized
      if (statusCode === HttpStatus.UNAUTHORIZED) {
        msg = 'Unauthorized access'; // Custom message for Unauthorized
        remarks = 'UNAUTHORIZED_ACCESS';
        exceptions = 'Access denied due to invalid credentials';
        errorCode = 'UNAUTHORIZED_ACCESS';
      }

      // Special handling for 404 Not Found - resource not found
      if (statusCode === HttpStatus.NOT_FOUND) {
        console.log(exceptionResponse);
        
        // If it's a route mismatch, you might see something like this
        console.log(exceptionResponse);
        if (exceptionResponse && typeof exceptionResponse === 'object' && exceptionResponse['message']?.includes('Cannot GET')) {
          msg = 'Route not found';
          remarks = 'ROUTE_NOT_FOUND';
          exceptions = 'The requested route could not be found';
          errorCode = 'ROUTE_NOT_FOUND';
        } 
        else if (typeof exceptionResponse === 'object' && exceptionResponse['message']?.includes('Cannot POST')) {
          msg = 'Route not found';
          remarks = 'ROUTE_NOT_FOUND';
          exceptions = 'The requested route could not be found';
          errorCode = 'ROUTE_NOT_FOUND';
        }
        else {
          msg = 'Resource not found';
          remarks = 'NOT_FOUND';
          exceptions = 'The requested resource could not be found';
          errorCode = 'NOT_FOUND';
        }
      }

      // Special handling for 408 Request Timeout
      if (statusCode === HttpStatus.REQUEST_TIMEOUT) {
        errorCode = 'REQUEST_TIMEOUT';
      }

      // Handle custom exception messages if provided
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const {
          msg: customMsg,
          errorCode: customErrorCode,
          remarks: customRemarks,
          exceptions: customExceptions,
          errors: customErrors,
          data: customData,  // Optional custom data
        } = exceptionResponse as any;

        // Use provided values or default if not provided
        msg = customMsg || msg;
        errorCode = customErrorCode || errorCode;
        remarks = customRemarks || remarks;
        exceptions = customExceptions || exceptions;
        errors = customErrors || errors;
        data = customData || null;  // Default to null if no data is provided
      } else if (typeof exceptionResponse === 'string') {
        exceptions = exceptionResponse;
      }
    } else {
      exceptions = 'Internal server error';
    }

    // Respond with the formatted error response
    response.status(statusCode).json({
      success, // Always set success to false in case of error
      statusCode,
      timestamp: new Date().toISOString(),
      msg,
      data, // Include data as null if not found
      errorCode,
      exceptions,
      remarks,
      errors,
    });
  }

  // Helper method to get default messages based on status code
  private getDefaultMessage(statusCode: number): string {
    const messages: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'Bad Request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Not Found',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
      [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',
      [HttpStatus.REQUEST_TIMEOUT]: 'Request Timeout',
      // Add more mappings for other status codes if needed
    };

    return messages[statusCode] || 'Error occurred'; // Default message if status code is not mapped
  }
}
