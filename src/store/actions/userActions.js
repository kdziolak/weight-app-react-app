export function addUserData (user) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {

        const firestore = getFirestore();
        firestore.collection('users').add({
            ...user
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