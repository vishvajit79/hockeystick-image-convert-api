import { Router } from 'express';

import { appContainer } from '../inversify.config';
import { InterfaceRequestValidationMiddleware } from '../plugins/request-validation.interface';
import { HealthController } from '../server/controllers/health.controller';
import { ImageController } from '../server/controllers/image.controller';
import { SwaggerController } from '../server/controllers/swagger.controller';
import { ImageConvert } from '../server/models/image-convert';

const routes = Router();

const swaggerController = appContainer.get<SwaggerController>(
  nameof<SwaggerController>()
);
const healthController = appContainer.get<HealthController>(
  nameof<HealthController>()
);
const imageController = appContainer.get<ImageController>(
  nameof<ImageController>()
);

const requestValidationMiddleware = appContainer.get<
  InterfaceRequestValidationMiddleware
>(nameof<InterfaceRequestValidationMiddleware>());

const validationMiddleware = requestValidationMiddleware.validationMiddleware.bind(
  requestValidationMiddleware
);

routes.get('/', healthController.getHealth.bind(healthController));

routes.get('/health', healthController.getHealth.bind(healthController));

routes.get('/api', swaggerController.getDocs.bind(swaggerController));

routes.use(
  '/image/convert',
  [
    validationMiddleware('body', ImageConvert, {
      validator: { groups: ['convertImage'] },
    }),
  ],
  imageController.convert.bind(imageController)
);

export { routes };
