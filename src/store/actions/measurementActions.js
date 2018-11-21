

export function fetchDataFromDatabase() {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        let firestore = getFirestore();
        let uid = getState().firebase.auth.uid;
        let docsID = []
        firestore.collection('users').where('userID','==' , uid).get().then((snap) => {
            docsID = [...docsID, snap.docs[0].id]
        })
        .then(() => {
            firestore.collection('users').doc(docsID[0]).collection('measurements').get().then((data) => {
               docsID = [...docsID, data.docs[0].id]
                dispatch({
                    type: "SUCCESS_FETCHING_MEASUREMENTS_DATA",
                    payloads: data
                })
            }).catch(err => {
                dispatch({type: 'ERROR_FETCHING_MEASUREMENTS_DATA', err: err.message})
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export function sendDataToDatabase(data) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        let firestore = getFirestore();
        let uid = getState().firebase.auth.uid;
        firestore.collection('users').where('userID','==' , uid).get().then((snap) => {
            return snap.docs[0].id
        })
        .then((id) => {
            let collection =  firestore.collection('users').doc(id).collection('measurements');
            collection.add({
                measurementType: 'weight',
                weightValue: data.weight,
                measurementDate: data.date
            }).then(() => {
                dispatch({type: 'ADDED_DATA_TO_DATABASE'})
            })
        }).catch(err =>{
            console.log(err)
        })
    }
}