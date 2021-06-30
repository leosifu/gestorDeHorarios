import React, {useState} from 'react';

import clientAxios from '../../../../../config/axios'

import DialogContent from '@material-ui/core/DialogContent';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, handleNotifications, } from '../../../../../redux/actions'

import PrimaryButton from '../../../../utils/PrimaryButton';

import AsignarAsignatura from '../asignarAsignatura'
import AsignaturaForm from '../asignaturaForm'

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
);

const Eleccion = ({open, setOpen, estado, setEstado, carreraId, nivel, user, }) =>{

  const dispatch = useDispatch();
  const malla = useSelector(MallaSelector);

  const [eleccion, setEleccion] = useState(0);

  const eleccion1 = () =>{
    setEleccion(1)
  }

  const eleccion2 = () =>{
    setEleccion(2)
  }

  function onSubmitForm(state) {
    dispatch(setLoading(true));
    if (!state.cod_asignatura.value || !state.nombre_asignatura.value ||
      (state.tel_T.value + state.tel_E.value + state.tel_L.value < 1)) {
      console.log(state.cod_asignatura.value);
      console.log(state.tel_T.value + state.tel_E.value + state.tel_L.value);
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        cod_asignatura: state.cod_asignatura.value,
        nombre_asignatura: state.nombre_asignatura.value,
        tel_T: parseInt(state.tel_T.value),
        tel_E: parseInt(state.tel_E.value),
        tel_L: parseInt(state.tel_L.value),
        nivel: nivel,
        lab_independiente: state.lab_independiente.checked,
        carreraId: carreraId,
        historial: {
          cupos_pasados: state.cupos_pasados.value || 0,
          tasa_reprobacion: state.tasa_reprobacion.value || 0,
          desinscripciones: state.desinscripciones.value || 0
        }
      }
      // console.log(data);
      // dispatch(setLoading(false))
      clientAxios(user.idToken).post(`/api/asignatura`, data)
      .then(res => {
        console.log(res.data);
        setOpen(false)
        setEstado(!estado)
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Asignatura creada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al actualizar la asignatura'}
        ));
      })
    }
  }

  var camposAsignatura = {
    cod_asignatura: '',
    nombre_asignatura: '',
    descripcion: '',
    tel_T: 0,
    tel_E: 0,
    tel_L: 0,
    cupos_pasados: 0,
    tasa_reprobacion: 0,
    desinscripciones: 0,
    lab_independiente: false,
  }

  if (eleccion === 1) {
    return(
      <AsignaturaForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm} tipo={0}
        estado={estado} setEstado={setEstado}/>
    )
  }
  else if (eleccion === 2) {
    return(
      <AsignarAsignatura nivel={nivel} carreraId={carreraId} estado={estado} setEstado={setEstado}
        open={open} setOpen={setOpen} user={user}/>
    )
  }
  else {
    return(
      <DialogContent>
        <PrimaryButton onClick={eleccion1} title={'Nueva Asignatura'} />
        <br />
        <PrimaryButton onClick={eleccion2} title={'Agregar Asignatura Existente'} />
      </DialogContent>
    )
  }
}
export default Eleccion
