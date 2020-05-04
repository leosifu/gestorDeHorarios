const initialState = {
  user: {
    email: '',
    photoURL: '',
    name: ''
  },
  status: 'notLogin'
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
    default:
      return state;
  }
}
