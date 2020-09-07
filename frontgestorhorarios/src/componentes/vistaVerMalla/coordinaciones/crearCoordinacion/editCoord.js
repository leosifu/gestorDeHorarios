import React, {useState} from 'react';

import axios from 'axios'
import Swal from 'sweetalert2';

import clientAxios from '../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, handleNotifications, } from '../../../../redux/actions'

import CoordinacionForm from './coordinacionForm/coordinacionForm'

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
);

function EditCoordinacion({coordinacion, estado, setEstado, user, profesores, setEdit,
  currentProceso, }){

  const dispatch = useDispatch();

  const malla = useSelector(MallaSelector);

  const [profesoresSelect, setProfesoresSelect] = useState(profesores);

  function onSubmitForm(state) {
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
        profesores: profesoresSelect,
        num_bloques: state.num_bloques.value
      }
      clientAxios(user.idToken).put(`/api/coordinacion/${coordinacion.id}`, data)
      .then(res => {
        setEstado(!estado)
        setEdit(false)
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Coordinación actualizada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al actualizar la coordinación'}
        ));
      })
    }
  }

  const eliminarCoordinacion = (event) => {
    Swal.fire({
      title: `Seguro que desea eliminar la coordinación ${coordinacion.InfoCoordinacion.cod_coord}`,
      text: 'No se podrá recuperar',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#000',
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Aceptar'
    })
    .then(result=>{
      if (result.value) {
        clientAxios(user.idToken)
        .delete(`/api/infoCoordinacion/${coordinacion.InfoCoordinacion.asignaturaId}/${coordinacion.id}`)
        .then(res => {
          setEstado(!estado)
          setEdit(false)
          dispatch(setLoading(false));
          dispatch(handleNotifications(true, {
            status: 'success',
            message: 'Coordinacion eliminada'}
          ));
        })
        .catch(error => {
          console.log(error);
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'error',
            message: 'Ocurrió un error al eliminar la coordinación'}
          ));
        })
      }
    })
  }

  const cancelarEdit = () => {
    setEdit(false)
  }

  const data = {
    cod_coord: coordinacion.InfoCoordinacion.cod_coord,
    nombre_coord: coordinacion.InfoCoordinacion.nombre_coord,
    tipo_coord: coordinacion.tipo_coord,
    num_bloques: coordinacion.num_bloques
  }

  return (
    <CoordinacionForm camposCord={data} onSubmitForm={onSubmitForm} setEstado={setEstado}
      estado={estado} profesoresSelect={profesoresSelect} user={user} currentProceso={currentProceso}
      setProfesoresSelect={setProfesoresSelect} profesores={profesores} edit={true}
      cancelarEdit={cancelarEdit} eliminarCoordinacion={eliminarCoordinacion} />
  );
}

export default EditCoordinacion
