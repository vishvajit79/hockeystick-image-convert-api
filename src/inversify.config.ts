import { Container, interfaces } from 'inversify';

import { InterfaceErrorHandlerPlugin } from './plugins/error-handler.interface';
import { ErrorHandlerPlugin } from './plugins/error-handler.plugin';
import { InterfaceRequestValidationMiddleware } from './plugins/request-validation.interface';
import { RequestValidationMiddleware } from './plugins/request-validation.plugin';
import { HealthController } from './server/controllers/health.controller';
import { ImageController } from './server/controllers/image.controller';
import { SwaggerController } from './server/controllers/swagger.controller';
import { SYMBOLS } from './server/models/error-symbol';

const appContainer = new Container();
appContainer
  .bind<InterfaceErrorHandlerPlugin>(nameof<InterfaceErrorHandlerPlugin>())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .toFactory<InterfaceErrorHandlerPlugin>((context: interfaces.Context) => {
    return (name: string): ErrorHandlerPlugin => {
      name = name || 'UNKNOWN';
      const service = appContainer.get<ErrorHandlerPlugin>(
        SYMBOLS.DiagnosticsInstance
      );
      service.setName(name);
      return service;
    };
  });
appContainer
  .bind<InterfaceErrorHandlerPlugin>(SYMBOLS.DiagnosticsInstance)
  .to(ErrorHandlerPlugin)
  .inTransientScope();
appContainer
  .bind<InterfaceRequestValidationMiddleware>(
    nameof<InterfaceRequestValidationMiddleware>()
  )
  .to(RequestValidationMiddleware)
  .inTransientScope();
appContainer
  .bind<SwaggerController>(nameof<SwaggerController>())
  .to(SwaggerController);
appContainer
  .bind<HealthController>(nameof<HealthController>())
  .to(HealthController);
appContainer
  .bind<ImageController>(nameof<ImageController>())
  .to(ImageController);
export { appContainer };
