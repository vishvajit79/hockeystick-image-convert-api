export interface ServiceConfig {
  name: string;
  environment: string;
  port: number;
  host: string;
  description: string;
  namespace: string;
}

export interface Config {
  serviceConfig: ServiceConfig;
}
