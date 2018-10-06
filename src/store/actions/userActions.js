export function addUserData (user) {
    return dispatch => {
        dispatch({
            type: 'ADD_USER_DATA',
            user
        })
    }
}