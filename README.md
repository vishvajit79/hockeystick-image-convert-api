# Image Convert API Microservice

Image Convert API Microservice is used to convert an image

## Installation

Install node v12.14.10 and above

```bash
npm install
npm run build

# Use to rebuild on change
npm run watch
```

## Usage

```bash
npm run local
npm run dev
npm run start
```

## Testing

```
# Run tests written in Typescript
npm run test

# Run tests on file change
npm run test:watch

# Fix lint auto
npm run lint:fix
```

## Lint

```
# Lint code with Eslint
npm run lint

# Run lint on any file change
npm run lint:watch
```

## Logging

Winston logging library is used for logging.

### API logging

Logs detailed info about each api request to console, log file and google metrics during development.

### Error logging

## Logs stack trace of the error to console along with other details. You should ideally store all error messages persistently.

## Deployment

Before deploying, make sure you have set the variables in the project repository

Go to the project repository -> Settings -> CI / CD -> Variables

1. GCP_APP_NAME : REPOSITORY_NAME
2. GCP_K8_SERVICE_KEY_PATH : PATH_TO_GCP_SERVICE_KEY_IN_CLOUD_BUCKET
3. GCP_PROJECT_ID : GOOGLE_PROJECT_ID
4. GCP_SERVICE_KEY : PASTE_THE_SERVICE_KEY_FROM_GOOGLE
5. KUBE_NAME : KUBERNETES_CLUSTER_NAME
6. KUBE_PASSWORD : KUBERNETES_CLUSTER_PASSWORD
7. KUBE_USER : KUBERNETES_CLUSTER_USER
8. MY_DOMAIN : DOMAIN_NAME
9. USE_SSL : True or False

Create or update the kubernets cluster mapping for the repository

Go to the project repository -> Operations -> Kubernetes -> Add new or custom kubernetes cluster

Install ingress and helm while creating a new kubernetes cluster

More info about deployment can be found here https://medium.com/@davivc/how-to-set-up-gitlab-ci-cd-with-google-cloud-container-registry-and-kubernetes-fa88ab7b1295

More info on how to create service account for kubernetes service https://blog.realkinetic.com/using-google-cloud-service-accounts-on-gke-e0ca4b81b9a2

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
