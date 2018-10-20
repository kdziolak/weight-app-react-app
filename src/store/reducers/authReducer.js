const auth = (
    state = [
      {
        
      }
    ],
    action = {}
  ) => {
    switch (action.type) {
      case "SIGNIN_SUCCESS": 
        console.log(action.type)
        break;
    case "SIGNIN_ERROR": 
        console.log(action.type)
        break;
      }
    
  
    return state;
  };
  
  export default user;
  