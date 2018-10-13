import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { init } from '@rematch/core';
import models from './models';

const logger = createLogger({});

export default function configureStore(rootReducer) {
  const store = init({
    models,
    redux: {
      reducers: rootReducer,
      middlewares: [thunk, logger],
    },
  });

  return store;
}
