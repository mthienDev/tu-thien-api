import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Với mọi giá trị trả về từ controller (trừ exception),
 * interceptor này sẽ wrap lại thành { success: true, data: ... }.
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, { success: true; data: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ success: true; data: T }> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
