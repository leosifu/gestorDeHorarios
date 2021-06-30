import React from 'react';

import axios from 'axios'
import Swal from 'sweetalert2';

import clientAxios from '../../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, handleNotifications, } from '../../../../../redux/actions'

import AsignaturaForm from '../asignaturaForm'

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
);

function EditAsignatura({infoAsignatura, asignatura, setEdit, estado, setEstado, user,
  estadoM, setEstadoM, carreraId, }){

  const dispatch = useDispatch();

  const malla = useSelector(MallaSelector);
  console.log(infoAsignatura);
  console.log(asignatura);

  function onSubmitForm(state) {
    dispatch(setLoading(true));
    console.log(state);
    if (!state.cod_asignatura.value || !state.nombre_asignatura.value ||
      (!state.nivel.value || state.nivel.value < 0) ||
      (state.tel_T.value + state.tel_E.value + state.tel_L.value < 1)) {
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
        lab_independiente: state.lab_independiente.checked,
        nivel: state.nivel.value,
        carreraId: carreraId,
      }
      const historial = {
        cupos_pasados: state.cupos_pasados.value || 0,
        tasa_reprobacion: state.tasa_reprobacion.value || 0,
        desinscripciones: state.desinscripciones.value || 0
      }
      axios.all([
        clientAxios(user.idToken).put(`/api/asignatura/${asignatura.id}/${carreraId}`, data),
        clientAxios(user.idToken).put(`/api/historial/${asignatura.id}`, historial)
      ])
      .then(axios.spread((data1, data2)=>{
        setEdit(false)
        setEstado(!estado)
        setEstadoM(!estadoM)
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Asignatura actualizada'}
        ));
      }))
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
    cod_asignatura: infoAsignatura.cod_asignatura,
    nombre_asignatura: infoAsignatura.nombre_asignatura,
    descripcion: '',
    tel_T: asignatura.tel_T,
    tel_E: asignatura.tel_E,
    tel_L: asignatura.tel_L,
    cupos_pasados: asignatura?.historial.cupos_pasados,
    tasa_reprobacion: asignatura?.historial.tasa_reprobacion,
    desinscripciones: asignatura?.historial.desinscripciones,
    lab_independiente: asignatura?.lab_independiente,
    nivel: infoAsignatura.nivel
  }

  const eliminarAsignatura = (event) => {
    Swal.fire({
      title: `Seguro que desea eliminar la asignatura ${infoAsignatura.nombre_asignatura}`,
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
        clientAxios(user.idToken).delete(`/api/infoAsignatura/${carreraId}/${asignatura.id}`)
        .then(res => {
          setEdit(false)
          setEstadoM(!estadoM)
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'success',
            message: 'Asignatura eliminada'}
          ));
        })
        .catch(error => {
          console.log(error);
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'error',
            message: 'Ocurrió un error al eliminar la asignatura'}
          ));
        })
      }
    })
  }

  return (
    <>
      <AsignaturaForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm} edit={true}
        eliminarAsignatura={eliminarAsignatura} />
    </>
  );
}

export default EditAsignatura
