const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogUpdateProceso':
      return {
        ...state,
        open: true,
      }
    case 'closeDialogUpdateProceso':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
