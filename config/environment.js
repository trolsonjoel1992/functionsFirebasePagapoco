let nodeEnv = process.env.NODE_ENV || 'default';

try {
  const functions = require('firebase-functions');
  if (functions.config && functions.config().environment?.node_env ) {
    nodeEnv = functions.config().environment.node_env;
  }

} catch (error) {
  console.error('Error loading firebase-functions. Using process.env.NODE_ENV only.');
}
console.log('nodeEnv:', nodeEnv);

let environmentFile = 'env.dev';
switch (nodeEnv) {
  case 'production':
    environmentFile = '.env';
    break;
    case 'dev':
    environmentFile = 'env.dev';
    break;
    case 'test':
    environmentFile = 'env.test';
    break;
    default:
    environmentFile = 'env.test';
    break;
}
console.log('Using environment file:', environmentFile);

require('dotenv').config({ path: environmentFile });