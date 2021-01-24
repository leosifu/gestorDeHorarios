const initialState = {
  open: false,
  selectedUser: -1
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogHorarioProfesor':
      return {
        ...state,
        open: true,
        selectedUser: action.payload
      }
    case 'closeDialogHorarioProfesor':
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
}
