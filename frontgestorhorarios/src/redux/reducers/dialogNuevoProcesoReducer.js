const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogNuevoProceso':
      return {
        ...state,
        open: true,
      }
    case 'closeDialogNuevoProceso':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
