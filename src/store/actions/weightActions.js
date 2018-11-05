export function fetchDataFromDatabase(weightData) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        let firestore = getFirestore();
        let uid = getState().firebase.auth.uid;
        let docsID = []
        firestore.collection('users').where('userID','==' , uid).get().then((snap) => {
            docsID = [...docsID, snap.docs[0].id]
        })
        .then((id) => {
            firestore.collection('users').doc(docsID[0]).collection('measurements').get().then((z) => {
               docsID = [...docsID, z.docs[0].id]
            }).then((id) => {
                firestore.collection('users').doc(docsID[0]).collection('measurements').doc(docsID[1]).get().then((z) => {
                    console.log(z.data())
                 })

            })
        }).catch(err =>{
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
                mesurementType: 'weight',
                weightValue: data.weight,
                measurementDate: data.date
            }).then(() => {
                console.log('xxx')
            })
        }).catch(err =>{
            console.log(err)
        })
    }
}