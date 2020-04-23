import { Config } from '../server/models/config';

export const productionConfig: Config = {
  serviceConfig: {
    name: 'Image Convert API Microservice',
    environment: 'production',
    namespace: 'hockeystick-image-convert-api',
    host: 'production.hockeystick-image-convert-api.api.findnemo.in',
    description: 'Presentation api to call internal microservices',
    port: 8081,
  },
};
