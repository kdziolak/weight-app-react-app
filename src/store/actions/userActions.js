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

export function editUserProfile (user, userFromFire) {
    
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        
        let editUserObject = {
            valueName: '',
            valueAge: '',
            valueGender: false,
            valueGrowth: 0,
            valueWeight: 0
        }
        
        const editUserValue = (fb, form, dataName) => {
            if(fb !== form && form !== "Noname" && form !== 0 && ( form === true || form === false) ) {
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
        }

        const firestore = getFirestore();
        let docID = '';
        firestore.collection('users').where('userID','==' , userFromFire.userID).get().then((snap) => {
            snap.docs.forEach(el => {
                docID = el.id;
            })
        }).then(() =>{
            let dataNames = ['valueName', 'valueAge',  'valueGrowth','valueGender', 'valueWeight'];
            firestore.collection('users').doc(docID).onSnapshot((el) => {
                let {valueName, valueAge, valueGrowth, valueGender, valueWeight} = el.data();
                let userDataFromFb = [valueName, valueAge, valueGrowth, valueGender, valueWeight];
                let userDataFromForm = [user.valueName, user.valueAge, user.valueGrowth, user.valueGender, user.valueWeight];
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
        }).then(() => {
            console.log(editUserObject)
            // firestore.collection('users').doc(docID).update({
            //     valueName: editUserObject.valueName,
            //     valueAge: editUserObject.valueAge,
            //     valueGender: editUserObject.valueGender,
            //     valueGrowth: editUserObject.valueGrowth,
            //     valueWeight: editUserObject.valueWeight,
            //     userID: userFromFire.userID,
            //     userEmail: userFromFire.userEmail,
            //     tmpValue: userFromFire.tmpValue
            // })
        })

    }
} 