const initialState = {
  open: false,
  data: {
    infoAsignatura: {},
    asignatura: {},
    estado: false,
    setEstado: () => {}
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogAsignatura':
      return {
        ...state,
        open: true,
        data: action.payload.data
      }
    case 'closeDialogAsignatura':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
