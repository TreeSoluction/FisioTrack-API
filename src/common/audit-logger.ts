import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditLogger implements NestInterceptor {
  private readonly sensitivePaths = ['/patients', '/treatments', '/sessions'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    const isSensitive = this.sensitivePaths.some((p) => url.startsWith(p));

    if (!isSensitive) {
      return next.handle();
    }

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        console.log(
          JSON.stringify({
            audit: true,
            userId: user?.id || 'anonymous',
            method,
            url,
            duration,
            timestamp: new Date().toISOString(),
          }),
        );
      }),
    );
  }
}
