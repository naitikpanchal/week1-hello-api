import pino from 'pino';
import { Request, Response, NextFunction } from 'express';

const logger = pino({
  transport: { target: 'pino-pretty', options: { colorize: true } },
});

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.baseUrl + req.path,
      statusCode: res.statusCode,
      duration,
    });
  });

  next();
};

export default logger;
