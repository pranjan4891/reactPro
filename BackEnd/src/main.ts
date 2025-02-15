import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from './logger/winston-logger.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { join } from 'path'; // Import the 'join' function
import { NestExpressApplication } from '@nestjs/platform-express'; // Import 'NestExpressApplication'
// import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global API prefix
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*', // Allows any origin
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Allow credentials (cookies, etc.)
  });

  // Set up Winston logging
  const logger = app.get(WinstonLoggerService);
  app.useLogger(logger);

  // Use global filters for exception handling
  app.useGlobalFilters(
    new HttpExceptionFilter(logger),
    // new GlobalExceptionFilter(),
    new AllExceptionsFilter(),
  );

  // Apply global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Function to format validation errors into a readable object
  function formatValidationErrors(errors: ValidationError[], parentPath = '') {
    return errors.reduce((acc, error) => {
      const propertyPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      if (error.constraints) {
        acc[propertyPath] = Object.values(error.constraints);
      }

      if (error.children && error.children.length > 0) {
        Object.assign(
          acc,
          formatValidationErrors(error.children, propertyPath),
        );
      }

      return acc;
    }, {});
  }

  // Customize ValidationPipe with error formatting
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = formatValidationErrors(validationErrors);
        return new BadRequestException({
          success: false,
          data: null,
          exceptions: null,
          httpStatusCode: 400,
          errorCode: 'VALIDATION_FAILED',
          remarks: 'VALIDATION_FAILED',
          msg: 'Validation error: One or more fields are invalid',
          errors,
        });
      },
    }),
  );

  // Increase the body size limit for requests
  app.use(
    express.json({
      limit: '20mb', // Set your desired size limit (20MB in this case)
    }),
  );

  app.use(
    express.urlencoded({
      limit: '20mb', // Set the URL-encoded body limit (same size)
      extended: true,
    }),
  );

  await app.listen(8000);
}

bootstrap();
