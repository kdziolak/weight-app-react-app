import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfing from '../firebase'

import user from './reducers/userReducer'

export default createStore(
    combineReducers({
        user: user,
        firestore: firestoreReducer
    }),
    {},
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}), logger),
        reduxFirestore(fbConfing),
        reactReduxFirebase(fbConfing)
    )
  );