import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * Catch tất cả exception trong app.
 * Đối với HttpException (BadRequest, NotFound, v.v.), chúng ta lấy status & message có sẵn.
 * Với exception khác, gán status = 500 và log để debug.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    // Lấy http adapter để phản hồi theo HTTP
    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    let status: number;
    let responseBody: any;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      responseBody = typeof res === 'string' ? { message: res } : res;
    } else {
      //Với mọi ngoại lệ khác (database error, undefined, v.v.), gán status = 500
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = { message: 'Internal server error' };
      console.error('Internal server error', exception);
    }
    const errorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...responseBody,
    };
    httpAdapter.reply(ctx.getResponse(), errorResponse, status);
  }
}
