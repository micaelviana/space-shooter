import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type LogFormat = 'simples' | 'completo';

export const logger = (format: LogFormat) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const logDir = process.env.LOGS_PATH || 'logs';
    const date = new Date();
    const fileName = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.log`;

    // Criar diretório de logs se não existir
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logPath = path.join(logDir, fileName);

    let logMessage = '';
    if (format === 'simples') {
      logMessage = `${new Date().toISOString()} ${req.url} ${req.method}\n`;
    } else if (format === 'completo') {
      logMessage = `${new Date().toISOString()} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')}\n`;
    }

    fs.appendFileSync(logPath, logMessage);
    next();
  };
};
