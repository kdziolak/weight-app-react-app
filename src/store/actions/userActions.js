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
            dispatch({
                type: 'SHOW_ERROR',
                err
            })
        })
        

    }
}

export function editUserProfile (user) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        const firestore = getFirestore();
        let docID = '';
        let userDataFromForm = [user.valueName, user.valueAge, user.valueGrowth, user.valueGender, user.valueWeight];
        let dataNames = ['valueName', 'valueAge', 'valueGrowth', 'valueGender', 'valueWeight'];
        let uid = getState().firebase.auth.uid;
        let editUserObject = {
            valueName: '',
            valueAge: '',
            valueGender: '',
            valueGrowth: 0,
            valueWeight: 0
        }
        
        const sendToFirebase = (editObj) =>{
            firestore.collection('users').doc(docID).update({
                valueName: editObj.valueName,
                valueAge: editObj.valueAge,
                valueGender: editObj.valueGender,
                valueGrowth: editObj.valueGrowth,
                valueWeight: editObj.valueWeight,
            })
        }

        const editUserValue = (fb, form, dataName, i, length) => {

            if(fb !== form && form !== "Noname" && form !== 0 && (form !== 'Male' || form !== 'Female') ) {
                editUserObject = {
                    ...editUserObject,
                    [dataName]: form
                }
            }else {
                editUserObject = {
                    ...editUserObject,
                    [dataName]: fb
                }
            }
            if(i === length){
                sendToFirebase(editUserObject)
            }
        }


        
        firestore.collection('users').where('userID','==' , uid).get().then((snap) => {
            docID = snap.docs[0].id;
            let {valueName, valueAge, valueGrowth, valueGender, valueWeight} = snap.docs[0].data();
            let userDataFromFb = [valueName, valueAge, valueGrowth, valueGender, valueWeight];
            userDataFromFb.forEach((userFromFb, i) => {
                editUserValue(userFromFb, userDataFromForm[i], dataNames[i], i, (dataNames.length - 1) );
            })
        }).then(() => {
            dispatch({type: 'EDIT_SUCCESS'})
        }).catch(err =>{
            dispatch({type: 'EDIT_ERROR', err})
        })
    }
} 