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
        return state;
      case "SIGNIN_ERROR": 
        state = {
            isLoading: false,
            errorMessage: action.payload.message
          }
        return state;
      default: {
        return state;
      }
    }
  };
  
  export default auth;
  