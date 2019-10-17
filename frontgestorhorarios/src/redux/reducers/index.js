import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import carreraReducer from './carreraReducer'

export default combineReducers({
  carrera: carreraReducer,
  form: formReducer
})
