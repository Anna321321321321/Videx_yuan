import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import epics from './epics';
import reducers from './reducers';

const configureStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(createEpicMiddleware(epics), thunk))
  );
  return store;
};

const store = configureStore();

export default store;
