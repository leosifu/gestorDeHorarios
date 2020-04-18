const initialState = {
  user: {
    email: '',
    photoURL: '',
    name: ''
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'loginUser':
      return {
        ...state,
        user: action.payload
      }
    case 'logoutUser':
      return {
        ...state,
        user: initialState.user
      }
      break;
    default:
      return state;
  }
}
