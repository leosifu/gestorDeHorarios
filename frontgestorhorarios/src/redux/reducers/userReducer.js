const initialState = {
  user: {
    email: '',
    photoURL: '',
    name: '',
    roles: []
  },
  status: null,
  loading: true
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'loginUser':
      return {
        ...state,
        user: action.payload,
        status: 'login'
      }
    case 'logoutUser':
      return {
        ...state,
        user: initialState.user,
        status: 'notLogin'
      }
      break;
    case 'loginFailed':
      return {
        ...state,
        status: 'loginFailed'
      }
      break;
    case 'userLoading':
      return {
        ...state,
        loading: true
      }
      break;
    case 'userNotLoading':
      return {
        ...state,
        loading: false
      }
      break;
    default:
      return state;
  }
}
