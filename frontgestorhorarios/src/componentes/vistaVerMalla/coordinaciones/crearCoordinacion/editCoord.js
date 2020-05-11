import React, {useState} from 'react';

import axios from 'axios'
import clientAxios from '../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, } from '../../../../redux/actions'

import CoordinacionForm from './coordinacionForm/coordinacionForm'

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
);

function EditCoordinacion({coordinacion, estado, setEstado, user, profesores, setEdit, }){

  const malla = useSelector(MallaSelector);

  const [profesoresSelect, setProfesoresSelect] = useState(profesores);

  function onSubmitForm(state) {
    const data = {
      cod_coord: state.cod_coord.value,
      nombre_coord: state.nombre_coord.value,
      tipo_coord: state.tipo_coord.value,
      profesores: profesoresSelect,
      num_bloques: state.num_bloques.value
    }
    console.log(data);
    clientAxios(user.idToken).put(`/api/coordinacion/${coordinacion.id}`, data)
    .then(res => {
      setEstado(!estado)
      setEdit(false)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const data = {
    cod_coord: coordinacion.InfoCoordinacion.cod_coord,
    nombre_coord: coordinacion.InfoCoordinacion.nombre_coord,
    tipo_coord: coordinacion.tipo_coord,
    num_bloques: coordinacion.num_bloques
  }

  return (
    <CoordinacionForm camposCord={data} onSubmitForm={onSubmitForm} setEstado={setEstado}
      estado={estado} profesoresSelect={profesoresSelect} user={user}
      setProfesoresSelect={setProfesoresSelect} profesores={profesores} edit={true}/>
  );
}

export default EditCoordinacion
