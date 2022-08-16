import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import http from 'http';

import cors from 'cors';

import 'express-async-errors';
import AppError from './errors/AppError';
import routes from './routes';

import './database/index';
import './container';
// import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(200).json(err);
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const serverHttp = http.createServer(app);

export { serverHttp };
