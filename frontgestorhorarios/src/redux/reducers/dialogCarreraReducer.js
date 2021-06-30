const initialState = {
  type: 'create',
  open: false,
  selectedCarrera: -1,
  carrera: {}
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogCarrera':
      return {
        ...state,
        open: true,
        type: action.payload.type,
        selectedCarrera: action.payload.selectedCarrera
      }
    case 'closeDialogCarrera':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
