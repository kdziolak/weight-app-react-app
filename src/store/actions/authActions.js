export function signUp (userData) {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            userData.email,
            userData.password
        ).then(res => {
            return firestore.collection('usersAuth').doc(res.usersAuth.uid).set({
                firstName: userData.name
            })
        }).then(() => {
            dispatch({type: 'CREATE_NEW_USER' })
        }).catch(err => {
            dispatch({type: 'SIGN_UP_ERROR', err})
        })
    }
}

export function signIn (loginData) {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(() =>  {
                dispatch({type: 'SIGNIN_SUCCESS'})
                // this.props.loggedInChanged(true)
            })
            .catch((err) => {
                dispatch({type: 'SIGNIN_ERROR'})
            })
    }
}


export function signOut (loginData) {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(() => {
                dispatch({type: "SIGNOUT_SUCCESS"})
            })
            .catch((err) => {
                dispatch({type: "SIGNOUT_ERROR"})
            } )
    }
}