const measurement = (
    state = {
        measurementsData: []
      },
    action = {}
  ) => {
    switch (action.type) {
      case "FETCH_MEASUREMENTS_DATA": 
        state = {
          measurementsData: action.payloads.docs.map(el => el.data())
        }
        return state;
      default: {
        return state;
      }
    }
  };
  
  export default measurement;
  