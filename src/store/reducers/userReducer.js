const user = (
    state = {
      name: '',
      age: null,
      gender: null,
      growth: 0,
      weight: 0
    },
    action = {}
  ) => {
    switch (action.type) {
      case "ADD_USER_DATA": {
        console.log(action.user)
        // state = {
        //   ...state,
        //   name: action.user.name
        // };
        break;
      }
    }
  
    return state;
  };
  
  export default user;
  