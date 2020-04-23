import { Config } from '../server/models/config';

export const localConfig: Config = {
  serviceConfig: {
    name: 'Image Convert API Microservice',
    environment: 'local',
    namespace: 'hockeystick-image-convert-api',
    host: 'localhost',
    description: 'Presentation api to call internal microservices',
    port: 8081,
  },
};
