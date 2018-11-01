const auth = (
    state = {
        isLoading: false,
        errorMessage: ''
      },
    action = {}
  ) => {
    switch (action.type) {
      case "SIGNIN_SUCCESS": 
        state = {
          isLoading: true,
          errorMessage: ''
        }
        break;
    case "SIGNIN_ERROR": 
        state = {
            isLoading: false,
            errorMessage: action.payload.message
          }
        break;
      }
    
  
    return state;
  };
  
  export default auth;
  