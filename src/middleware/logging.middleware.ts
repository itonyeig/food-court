import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      const { method, originalUrl, body } = req;
      const timestamp = new Date().toISOString();
      const handler = res['_currentRoute'];

      this.logger.log(
        `[${timestamp}] ${method} ${originalUrl} Handled by: ${handler} - Body: ${JSON.stringify(
          body,
        )}`,
      );
    });

    next();
  }
}
