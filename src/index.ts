// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/ts-nameof/ts-nameof.d.ts" />
import 'express-async-errors';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { config } from './config';
import { swaggerSpec } from './config/swagger';
import { routes } from './routes';
import { errorMiddleware } from './server/middlewares/error.middleware';
import { logger, loggerStream } from './server/utils/logger';

const app = express();
app.use(morgan('combined', { stream: loggerStream }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
  })
);
app.use('/', routes);
app.use(errorMiddleware);

(async (): Promise<void> => {
  // Do not initialize before calling plugins manager
  require('./bluebird');

  // Start the server
  app.listen(config.serviceConfig.port, () => {
    logger.info(`Server running on port ${config.serviceConfig.port}`);
  });
})();
