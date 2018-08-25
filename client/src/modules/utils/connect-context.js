import localStorageManager from '../utils/localStorageManager';

const LOCAL_STORAGE_KEY = 'hino-connect-context';

export function getCachedConnectContext() {
  const cachedConnectContext = localStorageManager.getItem(LOCAL_STORAGE_KEY);
  return cachedConnectContext && cachedConnectContext.value;
}

export function cacheSelectedConnectContext(serviceCenter) {
  localStorageManager.setItem(LOCAL_STORAGE_KEY, { value: serviceCenter });
  return getCachedConnectContext();
}
