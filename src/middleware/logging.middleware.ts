import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body } = req;
    res.on('finish', () => {
      const timestamp = new Date().toISOString();
      this.logger.log(
        `[${timestamp}] ${originalUrl} - Body: ${JSON.stringify(body)}`,
      );
    });
    next();
  }
}
