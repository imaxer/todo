//@flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import tasks from './tasks';
import { syncMiddleware } from './tasks';

const storeEnhancer: any = applyMiddleware(syncMiddleware);

const root = combineReducers({ tasks });

export const configureStore = (initialState?: Object = {}) => {
  const store = createStore(root, initialState, storeEnhancer);
  if (module.hot) {
    module.hot.accept('./tasks', async () => {
      const { default: nextReducer } = await import('./tasks');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
