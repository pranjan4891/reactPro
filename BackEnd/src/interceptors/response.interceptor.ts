import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        // Set status code if needed, e.g., 200 for success
        const statusCode = response.httpStatusCode || 200; // Default to 200 OK if not set

        return {
          success: true,
          ...(data || null),
          exceptions: null,
          httpStatusCode: statusCode,
          remarks: 'RESPONSE_SUCCESSFUL',
          msg: data?.msg || 'Request was successful',
          errors: null,
        };
      }),
    );
  }
}
