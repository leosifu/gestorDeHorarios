const initialState={
  idCarrera: 0,
  nombre_carrera: '',
  jornada: '',
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setCarrera':
      return {
        ...state,
        idCarrera: action.payload.idCarrera,
        nombre_carrera: action.payload.nombre_carrera,
        jornada: action.payload.jornada
      }
    default:
      return state;
  }
}
