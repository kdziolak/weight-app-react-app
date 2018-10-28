const user = (
    state = [
      {
        name: '',
        age: null,
        gender: 'Choose gender.',
        growth: 0,
        weight: 0
      }
    ],
    action = {}
  ) => {
    switch (action.type) {
      case "ADD_USER_DATA": {
        console.log(action.user)
        state = [
          ...state,
          {
            name: action.user.valueName,
            age: action.user.valueAge,
            gender: action.user.valueGender,
            growth: action.user.valueGrowth,
            weight: action.user.valueWeight
          }
        ];
        break;
      }
      case "EDIT_SUCCESS": {
        break;
      }
      case "EDIT_ERROR": {
        break;
      }
    }
  
    return state;
  };
  
  export default user;
  