const auth = (
    state = {
        errorMessage: ''
      },
    action = {}
  ) => {
    switch (action.type) {
      case "SIGNIN_SUCCESS": 
        state = {
          errorMessage: ''
        }
        break;
    case "SIGNIN_ERROR": 
        console.log(action.payload.message)
        state = {
            errorMessage: action.payload.message
          }
        break;
      }
    
  
    return state;
  };
  
  export default auth;
  