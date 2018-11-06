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
        return state;
      case "SIGNIN_ERROR": 
        state = {
            errorMessage: action.payload.message
          }
        return state;
      default: {
        return state;
      }
    }
  };
  
  export default auth;
  