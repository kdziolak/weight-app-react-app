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

export function editUserProfile (user, userID, dataName) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {

        const editUserValue = (fb, form) => {
            if(form !== fb && form !== 'Noname' ){
                
            } else if(form !== fb && form !== 0){

            }
        }

        const firestore = getFirestore();
        let docID = '';
        firestore.collection('users').where('userID','==' , userID).get().then((snap) => {
            snap.docs.forEach(el => {
                docID = el.id;
            })
        }).then(() =>{
            let dataNames = ['valueName', 'valueAge', 'valueGrowth', 'valueGender', 'valueWeight'];
            
            firestore.collection('users').doc(docID).onSnapshot((el) => {
                let {valueName, valueAge, valueGrowth, valueGender, valueWidth} = el.data();
                let userDataFromFb = [valueName, valueAge, valueGrowth, valueGender, valueWidth];
                let userDataFromForm = [user.valueName, user.valueAge, user.valueGrowth, user.valueGender, user.valueWidth];
                userDataFromFb.forEach((userFromFb, i) => {
                    userDataFromForm.forEach((userFromForm, j) =>{
                        dataNames.forEach((dataName, k) => {
                            if(i === j && k === i && j === k){
                                editUserValue(userFromFb, userFromForm, dataName)
                            }
                        })
                    })
                })
                
            })
        })

    }
} 