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

export function editUserProfile (user, userID) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {

        const firestore = getFirestore();
        const userEmail = getState().firebase.profile.email;
        const userID = getState().firebase.auth.uid;
        let docID = 0;

        firestore.collection('users').where('userID','==' , userID).get().then((snap) => {
            snap.docs.forEach(el => {
                docID = el.id;
            })
        }).then(() =>{
            firestore.collection('users').doc(docID).update({
                ...user
            }).then(() => {
                console.log('huuu ra')
            })
        })

    }
} 