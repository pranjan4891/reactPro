import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { Response } from 'express'; // Ensure correct import

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  // Define error code mapping based on HTTP status codes
  private readonly errorCodeMap = {
    [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
    [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
    [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
    [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
    [HttpStatus.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
    [HttpStatus.REQUEST_TIMEOUT]: 'REQUEST_TIMEOUT',
    // Add other status codes as needed
  };

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';
    let errorCode = 'INTERNAL_SERVER_ERROR'; // Default errorCode
    let status = 'error'; // Default status (if not provided in the exception)

    // Handle known exceptions
    if (exception instanceof HttpException) {
    //   console.error('helo => 125', exception.getResponse());
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Check for a custom status field in the response
      if (exceptionResponse && typeof exceptionResponse === 'object') {
        if (exceptionResponse['status']) {
          status = exceptionResponse['status']; // Use the status passed from exception
        }
        if (exceptionResponse['message']) {
          msg = exceptionResponse['message']; // Use the message passed from exception
        }
        if (exceptionResponse['remarks']) {
          msg =
            exceptionResponse['remarks'] === 'TIMEOUT_ERROR' &&
            'Request timed out. Processing took too long.'; // Use the status passed from exception
        }
      }

      // Look up errorCode based on statusCode
      errorCode = this.errorCodeMap[statusCode] || 'INTERNAL_SERVER_ERROR'; // Default to 'INTERNAL_SERVER_ERROR' if not found
    } else if (exception instanceof RequestTimeoutException) {
      
      // For custom exception types like RequestTimeoutException
      statusCode = HttpStatus.REQUEST_TIMEOUT;
      msg = exception.message || 'Request timed out. Processing took too long.';
      errorCode = 'REQUEST_TIMEOUT';
      status = 'error';
    }

    // Return the custom error response with the mapped errorCode and status
    response.status(statusCode).json({
      statusCode,
      message: msg, // Customize message for the controller
      errorCode, // Use the mapped errorCode
      status, // Include the status field from the exception (if provided)
    });
  }
}
