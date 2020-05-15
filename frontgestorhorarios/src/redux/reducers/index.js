import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import carreraReducer from './carreraReducer'
import mallaReducer from './mallaReducer'
import loaderReducer from './loaderReducer'
import procesoReducer from './procesoReducer'
import userReducer from './userReducer'
import dialogUsuarioReducer from './dialogUsuarioReducer'
import dialogHorarioProfesorReducer from './dialogHorarioProfesorReducer'
import dialogUpdateProcesoReducer from './dialogUpdateProcesoReducer'

const createRootReducer = (history) => combineReducers({
  carrera: carreraReducer,
  malla: mallaReducer,
  loading: loaderReducer,
  proceso: procesoReducer,
  user: userReducer,
  dialogUsuario: dialogUsuarioReducer,
  dialogHorarioProfesor: dialogHorarioProfesorReducer,
  dialogUpdateProceso: dialogUpdateProcesoReducer,
  router: connectRouter(history)
})

export default createRootReducer
