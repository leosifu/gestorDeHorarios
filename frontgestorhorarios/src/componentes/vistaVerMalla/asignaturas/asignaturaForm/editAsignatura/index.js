import React from 'react';

import axios from 'axios'
import clientAxios from '../../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, } from '../../../../../redux/actions'

import AsignaturaForm from '../asignaturaForm'

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
);

function EditAsignatura({infoAsignatura, asignatura, setEdit, estado, setEstado, user,
  estadoM, setEstadoM, }){

  console.log(asignatura);
  console.log(infoAsignatura);
  const malla = useSelector(MallaSelector);
  console.log(malla);

  function onSubmitForm(state) {
    const data = {
      cod_asignatura: state.cod_asignatura.value,
      nombre_asignatura: state.nombre_asignatura.value,
      tel_T: parseInt(state.tel_T.value),
      tel_E: parseInt(state.tel_E.value),
      tel_L: parseInt(state.tel_L.value),
      lab_independiente: state.lab_independiente.checked,
      nivel: state.nivel.value,
      mallaId: malla.id,
    }
    const historial = {
      cupos_pasados: state.cupos_pasados.value,
      tasa_reprobacion: state.tasa_reprobacion.value,
    }
    axios.all([
      clientAxios(user.idToken).put(`/api/asignatura/${asignatura.id}/${malla.id}`, data),
      clientAxios(user.idToken).put(`/api/historial/${asignatura.id}`, historial)
    ])
    .then(axios.spread((data1, data2)=>{
      setEdit(false)
      setEstado(!estado)
      setEstadoM(!estadoM)
    }))
    .catch(error => {
      console.log(error);
    })
  }

  var camposAsignatura = {
    cod_asignatura: infoAsignatura.cod_asignatura,
    nombre_asignatura: infoAsignatura.nombre_asignatura,
    descripcion: '',
    tel_T: asignatura.tel_T,
    tel_E: asignatura.tel_E,
    tel_L: asignatura.tel_L,
    cupos_pasados: asignatura.historial.cupos_pasados,
    tasa_reprobacion: asignatura.historial.tasa_reprobacion,
    lab_independiente: asignatura.lab_independiente,
    nivel: infoAsignatura.nivel
  }

  return (
    <>
      <AsignaturaForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm} edit={true}/>
    </>
  );
}

export default EditAsignatura
