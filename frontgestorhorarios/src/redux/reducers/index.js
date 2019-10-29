import {combineReducers} from 'redux';
import carreraReducer from './carreraReducer'
import mallaReducer from './mallaReducer'

export default combineReducers({
  carrera: carreraReducer,
  mallaId: mallaReducer
})
