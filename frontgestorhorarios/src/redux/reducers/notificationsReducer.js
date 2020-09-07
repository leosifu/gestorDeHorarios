const initialState={
  open: false,
  status: '',
  message: ''
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'openNotification':
      return {
        ...state,
        open: true,
        status: action.payload.status,
        message: action.payload.message
      }
    case 'closeNotification':
      return {
        ...state,
        open: false,
        message: ''
      }
    default:
      return state;
  }
}
