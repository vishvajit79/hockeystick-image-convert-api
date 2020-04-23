import { Config } from '../server/models/config';

export const developmentConfig: Config = {
  serviceConfig: {
    name: 'Image Convert API Microservice',
    environment: 'developemnt',
    namespace: 'hockeystick-image-convert-api',
    host: 'staging.hockeystick-image-convert-api.api.findnemo.in',
    description: 'Presentation api to call internal microservices',
    port: 8081,
  },
};
