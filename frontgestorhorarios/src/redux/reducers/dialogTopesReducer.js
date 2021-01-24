const initialState = {
  open: false,
  data: {
    nivel: 0,    
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogTopes':
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case 'closeDialogTopes':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
