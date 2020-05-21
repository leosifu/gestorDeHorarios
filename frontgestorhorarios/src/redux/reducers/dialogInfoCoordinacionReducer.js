const initialState = {
  open: false,
  coordinacion: {
    nombre_coord: '',
    cod_coord: '',
    profesores: []
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogInfoCoordinacion':
      return {
        ...state,
        open: true,
        coordinacion: action.payload
      }
    case 'closeDialogInfoCoordinacion':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
