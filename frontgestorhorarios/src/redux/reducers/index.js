import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import carreraReducer from './carreraReducer'
import mallaReducer from './mallaReducer'
import loaderReducer from './loaderReducer'
import procesoReducer from './procesoReducer'

const createRootReducer = (history) => combineReducers({
  carrera: carreraReducer,
  malla: mallaReducer,
  loading: loaderReducer,
  proceso: procesoReducer,
  router: connectRouter(history)
})

export default createRootReducer
