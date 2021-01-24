const initialState={
  malla: {
    id: 0,
    Carrera: {},
  },
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setMalla':
      return {
        ...state,
        malla: action.payload,
      }
    default:
      return state;
  }
}
