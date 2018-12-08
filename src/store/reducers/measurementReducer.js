const measurement = (
  state = {
    measurementsData: [],
    error: '',
    redirect: false,
    loader: false
  },
  action = {}
) => {
  switch (action.type) {
    case "ADDED_DATA_TO_DATABASE":
      state = {
        error: '',
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
    case 'CHANGE_REDIRECT_STATE':
      state = {
        ...state,
        redirect: false
      }
    case "FILTER_MEASUREMENTS_DATA":
      if (action.payloads === undefined) return state;
      state = {
        ...state,
        loader: true,
        measurementsData: action.payloads.map(el => el.data())
      }
      return state;
    case "RESET_FILTER":
      if (action.payloads === undefined) return state;
      state = {
        ...state,
        loader: false,
        measurementsData: null
      }
      return state;
    default: {
      return state;
    }
  }
};

export default measurement;
