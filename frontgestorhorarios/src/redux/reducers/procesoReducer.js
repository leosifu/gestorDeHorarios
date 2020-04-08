const initialState = {
  currentProceso: {
    id: -1,
    año: -1,
    semestre: -1
  },
  procesos: []
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setProceso':
      return {
        ...state,
        currentProceso: action.payload
      }
    case 'setProcesos':
      return {
        ...state,
        procesos: action.payload
      }
      break;
    default:
      return state;
  }
}
