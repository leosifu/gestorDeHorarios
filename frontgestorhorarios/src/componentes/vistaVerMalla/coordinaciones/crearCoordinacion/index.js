import React, {useState} from 'react';

import clientAxios from '../../../../config/axios'

import DialogContent from '@material-ui/core/DialogContent';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import PrimaryButton from '../../../utils/PrimaryButton';

// import AsignarAsignatura from '../asignarAsignatura'
import CoordinacionForm from './coordinacionForm/coordinacionForm'
import AsociarCoord from './asociarCoord'

const EleccionCoord = ({nombre_asignatura, asignatura, lab_independiente, estado, setEstado,
  crear, setCrear, user, currentProceso, cancelar, carreraId, }) =>{

  const dispatch = useDispatch();

  const [eleccion, setEleccion] = useState(0);
  const [profesoresSelect, setProfesoresSelect] = useState([]);

  const eleccion1 = () =>{
    setEleccion(1)
  }

  const eleccion2 = () =>{
    setEleccion(2)
  }

  const data = {
    cod_coord: '',
    nombre_coord: nombre_asignatura,
    tipo_coord: '',
    num_bloques: 0
  }

  function handleClick(e){
    e.preventDefault()
    setCrear(true)
  }

  function onSubmitForm(state){
    dispatch(setLoading(true));
    if (!state.cod_coord.value || !state.nombre_coord.value ||
      (!state.num_bloques.value || state.num_bloques.value < 0)) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        cod_coord: state.cod_coord.value,
        nombre_coord: state.nombre_coord.value,
        tipo_coord: state.tipo_coord.value,
        asignaturaId: asignatura.id,
        num_bloques: state.num_bloques.value,
        profesores: profesoresSelect
      }
      clientAxios(user.idToken).post('/api/coordinacion', data)
      .then(res => {
        setCrear(false)
        setEstado(!estado)
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Coordinación Creada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al crear la coordinación'}
        ));
      })
    }
  }

  if (eleccion === 1) {
    return(
      <CoordinacionForm camposCord={data} onSubmitForm={onSubmitForm} setEstado={setEstado}
        estado={estado} profesoresSelect={profesoresSelect} user={user}
        setProfesoresSelect={setProfesoresSelect} currentProceso={currentProceso}
        cancelar={cancelar}
      />
    )
  }
  else if (eleccion === 2) {
    return(
      <AsociarCoord asignaturaAct={asignatura} estado={estado} setEstado={setEstado} user={user}
        currentProceso={currentProceso} setCrear={setCrear} cancelar={cancelar} carreraId={carreraId}
      />
    )
  }
  else {
    return(
      <DialogContent>
        <PrimaryButton onClick={eleccion1} title={'Nueva Coordinación'} />
        <br />
        <PrimaryButton onClick={eleccion2} title={'Agregar Coordinación Existente'} />
      </DialogContent>
    )
  }
}
export default EleccionCoord
