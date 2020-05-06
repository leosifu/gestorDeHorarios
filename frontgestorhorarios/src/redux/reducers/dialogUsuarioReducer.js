const initialState = {
  open: false,
  usuario: {
    nombre: '',
    email: '',
    lastName: '',
    rut: ''
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
        open: false,
        type: ''
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
        open: false,
        usuario: {},
        type: ''
      }
      break;
    default:
      return state;
  }
}
