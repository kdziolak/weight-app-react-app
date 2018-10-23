export function addUserData (user) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {

        const firestore = getFirestore();
        const userEmail = getState().firebase.profile.email;
        const userID = getState().firebase.auth.uid;

        firestore.collection('users').add({
            ...user,
            userEmail: userEmail,
            userID: userID
        })
        .then(() => {
            dispatch({
                type: 'ADD_USER_DATA',
                user
            })
        })
        .catch(err => {
            console.log(err)
            // dispatch({
            //     type: 'SHOW_ERROR',
            //     err
            // })
        })
        

    }
}