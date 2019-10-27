import {combineReducers} from 'redux';
import carreraReducer from './carreraReducer'

export default combineReducers({
  carrera: carreraReducer,
})
