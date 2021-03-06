import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase'
import fbConfing from '../firebase'

import user from './reducers/userReducer'
import auth from './reducers/authReducer'
import measurement from './reducers/measurementReducer'
import bodyMeasurement from './reducers/bodyMeasurementReducer'

export default createStore(
    combineReducers({
        bodyMeasurement: bodyMeasurement,
        measurement: measurement,
        auth: auth,
        user: user,
        firestore: firestoreReducer,
        firebase: firebaseReducer
    }),
    {},
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }), logger),
        reduxFirestore(fbConfing),
        reactReduxFirebase(fbConfing, { useFirestoreForProfile: true, userProfile: 'usersAuth', attachAuthIsReady: true })
    )
);