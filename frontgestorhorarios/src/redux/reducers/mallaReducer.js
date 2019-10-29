const initialState={
  mallaId: 0,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setMallaId':
      return {
        ...state,
        mallaId: action.payload,
      }
    default:
      return state;
  }
}
