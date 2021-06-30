const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openRightBar':
      return {
        ...state,
        open: true,
      }
    case 'closeRightBar':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
