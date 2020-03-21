const initialState = {
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'startLoading':
      return {
        ...state,
        loading: true,
      }
    case 'finishLoading':
      return {
        ...state,
        loading: false,
      }
      break;
    default:
      return state;
  }
}
