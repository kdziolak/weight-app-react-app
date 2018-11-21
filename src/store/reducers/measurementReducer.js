const measurement = (
    state = {
        measurementsData: [],
        error: '',
        redirect: false
      },
    action = {}
  ) => {
    switch (action.type) {
      case "ADDED_DATA_TO_DATABASE": 
        state = {
          error:'',
          redirect: true
        }
        return state;
      case "SUCCESS_FETCHING_MEASUREMENTS_DATA": 
        state = {
          error: '',
          redirect: false,
          measurementsData: action.payloads.docs.map(el => el.data())
        }
        return state;
      case "ERROR_FETCHING_MEASUREMENTS_DATA": 
        state = {
          ...state,
          error: action.err
        }
        return state;
      default: {
        return state;
      }
    }
  };
  
  export default measurement;
  