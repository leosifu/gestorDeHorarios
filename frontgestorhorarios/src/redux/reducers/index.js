import {combineReducers} from 'redux';
import carreraReducer from './carreraReducer'
import mallaReducer from './mallaReducer'
import loaderReducer from './loaderReducer'

const createRootReducer = () => combineReducers({
  carrera: carreraReducer,
  malla: mallaReducer,
  loading: loaderReducer
})

export default createRootReducer
