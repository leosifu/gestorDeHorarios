const initialState = {
  open: false,
  usuario: {
    id: 0,
    nombre: '',
    email: '',
    lastName: '',
    rut: '',
    roles: []
  },
  type: ''
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openDialogCreateUsuario':
      return {
        ...state,
        open: true,
        type: 'create'
      }
    case 'closeDialogCreateUsuario':
      return {
        ...state,
        ...initialState
      }
    case 'openDialogEditUsuario':
      return {
        ...state,
        open: true,
        usuario: action.payload,
        type: 'edit'
      }
      break;
    case 'closeDialogEditUsuario':
      return {
        ...state,
        ...initialState
      }
      break;
    default:
      return state;
  }
}
