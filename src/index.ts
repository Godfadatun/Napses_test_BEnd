/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import swaggerUI from 'swagger-ui-express';
import { Server } from 'socket.io';
import * as swaggerDocument from './routes/swagger.json';

import logger from './utils/logger';
import router from './routes';

dotenv.config();
const port = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors());
  app.use(helmet());

  app.use('/api', router);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.get('/', (req: Request, res: Response) => {
    res.json({ greeting: `Hello, Good Morning ${port} !` });
  });

  app.use((req, res, _next): void => {
    res.status(404).send({
      status: false,
      error: 'resource not found',
    });
  });

  // handle unexpected errors
  app.use((err: any, req: Request, res: Response, _next: NextFunction): void => {
    res.status(err.status || 500).send({
      success: false,
      error: 'Internal server error.',
    });
  });

  await createConnection()
    .then(() => logger.info('Database connected'))
    .catch((err) => {
      logger.error('Database connection failed');
      logger.error(JSON.stringify(err));
      process.exit(1);
    });

  const server = app.listen(port, () => {
    logger.info(`App is listening on port ${port} !`);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`A new socket has joined: ${socket.id}`);

    // Emit events
    socket.on('chat', (data) => {
      io.sockets.emit('chat', data);
    });
    socket.on('look', (data) => {
      socket.broadcast.emit('look', data);
    });
  });
}

startServer();
