import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import user from './reducers/userReducer'

export default createStore(
    combineReducers({
        user
    }),
    {},
    applyMiddleware(thunk, logger)
  );