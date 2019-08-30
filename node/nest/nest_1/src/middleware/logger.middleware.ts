import { Injectable, NestMiddleware, Next } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // tslint:disable-next-line:ban-types
  use(req: Request, res: Response, next: Function) {
    console.log('Request...', req);
    next();
  }
}
