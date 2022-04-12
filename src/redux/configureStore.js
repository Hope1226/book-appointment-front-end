import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { userInformation } from './task';

const reducers = combineReducers({ userInformation });

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;
