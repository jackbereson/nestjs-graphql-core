import { Injectable, Logger, NestMiddleware, Query } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogHelper } from '../helpers/log.helper';

@Injectable()
export class GraphQLLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { query, variables, operationName } = req.body;
    new Logger("Graphql").debug(LogHelper.getChalkGQL(query));
    next();
  }
}
