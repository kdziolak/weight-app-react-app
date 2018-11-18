const measurement = (
    state = {
        measurementsData: [],
        redirect: false
      },
    action = {}
  ) => {
    switch (action.type) {
      case "ADDED_DATA_TO_DATABASE": 
        state = {
          ...state,
          redirect: true
        }
        return state;
      case "FETCH_MEASUREMENTS_DATA": 
        state = {
          redirect: false,
          measurementsData: action.payloads.docs.map(el => el.data())
        }
        return state;
      default: {
        return state;
      }
    }
  };
  
  export default measurement;
  