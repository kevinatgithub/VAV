import authWeb from './auth.web';
import localStorageManager from './localStorageManager';

const getConfig = (propertyName) => {
  return (
    (localStorageManager.getItem(STORAGE_NAME) && localStorageManager.getItem(STORAGE_NAME)[propertyName]) ||
    propertyName
  );
};

const app = (config) => {
  return authWeb({
    clientId: (config && config.clientId) || getConfig('clientId'),
    tenant: (config && config.tenant) || getConfig('tenant'),
    resource: (config && config.resource) || getConfig('resource'),
    redirectUri: (config && config.redirectUri) || getConfig('redirectUri'),
  });
};

export default app;
