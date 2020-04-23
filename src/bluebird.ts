import { Promise } from 'bluebird';

// Replaces native ES6 Promises with Bluebird Promises across the app
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.Promise = Promise as any;
