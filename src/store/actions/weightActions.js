export function sendDataToDatabase(weightData) {
    return (dispatch, getState, {getFirebase, getFirestore} ) => {
        let firestore = getFirestore();
        let uid = getState().firebase.auth.uid;
        let docsID = []
        firestore.collection('users').where('userID','==' , uid).get().then((snap) => {
            docsID = [...docsID, snap.docs[0].id]
        })
        .then((id) => {
            firestore.collection('users').doc(docsID[0]).collection('weightMeasurements').get().then((z) => {
               docsID = [...docsID, z.docs[0].id]
            }).then((id) => {
                firestore.collection('users').doc(docsID[0]).collection('weightMeasurements').doc(docsID[1]).get().then((z) => {
                    console.log(z.data())
                 })

            })
        }).catch(err =>{
            console.log(err)
        })
    }
}