import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { init } from '@rematch/core';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({});

export function configureStore2(rootReducer) {
  const store = init({
    redux: {
      reducers: rootReducer,
      middlewares: [thunk, logger, sagaMiddleware],
    },
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export default function configureStore(rootReducer) {
  let createStoreWithMiddleware;
  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers =
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    createStoreWithMiddleware = composeEnhancers(
      applyMiddleware(sagaMiddleware, thunk, logger),
    )(createStore);
  } else {
    createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware, thunk))(
      createStore,
    );
  }
  const store = createStoreWithMiddleware(rootReducer);
  sagaMiddleware.run(rootSaga);
  return store;
}
