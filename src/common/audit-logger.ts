import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';

@Injectable()
export class AuditLogger implements NestInterceptor {
  private readonly logger = new Logger(AuditLogger.name);
  private readonly excludePaths = ['/health'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    if (this.excludePaths.some((p) => url.startsWith(p))) {
      return next.handle();
    }

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(
          JSON.stringify({
            userId: user?.id || 'anonymous',
            method,
            url,
            duration,
          }),
        );
      }),
      catchError((error) => {
        const duration = Date.now() - start;
        this.logger.warn(
          JSON.stringify({
            userId: user?.id || 'anonymous',
            method,
            url,
            duration,
            error: error.message,
          }),
        );
        throw error;
      }),
    );
  }
}
