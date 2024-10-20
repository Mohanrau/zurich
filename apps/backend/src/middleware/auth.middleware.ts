import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userRole = req.headers['role'];
    if (userRole === 'admin') {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
}
