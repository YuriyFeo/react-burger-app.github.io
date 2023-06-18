//  Создаю redux store и переношу сюда усилители  //
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

//  Подключаю Redux DevTools  //
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
//  Создал подключение к redux store с усилителем  //
export const store = createStore(rootReducer, enhancer);
