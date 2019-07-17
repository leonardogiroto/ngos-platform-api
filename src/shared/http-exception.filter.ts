import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message && exception.message.message ?
      exception.message.message : '--';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
      Sentry.captureException(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date(),
      path: request.url,
      message
    });
  }

}
