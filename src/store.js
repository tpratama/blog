import _ from 'lodash';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import history from './utils/history';


const composeEnhancers = (_.toLower(process.env.NODE_ENV) === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(routerMiddleware(history)),
  ),
);

window.__store__ = store;

export default store;