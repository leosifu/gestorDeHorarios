import React from 'react'

import axios from 'axios';

import DatosCoordForm from './coordinacionForm/datosCoordForm'
import useForm from '../../form/useForm'

const SetCoordinacionForm = ({coordinacion, asignatura}) => {

  console.log(coordinacion);

  const onSubmitForm = event=>{
    var data = {
      asignaturaId: asignatura,
      coordinacionId: coordinacion.InfoCoordinacion.coordinacionId,
      nombre_coord: coordinacion.InfoCoordinacion.nombre_coord,
      cod_coord: coordinacion.InfoCoordinacion.cod_coord
    }
    var link ='http://localhost:8000/api/asigncoord'
    console.log(data);
    axios.post(link, data)
    .then(res=>{
      console.log(res.data);
    })
  }

  const stateSchema = {
    cod_coord: { value: coordinacion.cod_coord, error: '' },
    nombre_coord: { value: coordinacion.nombre_coord, error: '' },
  };

  const validationStateSchema = {
    cod_coord: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_coord: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return(
    <DatosCoordForm handleOnChange={handleOnChange} cod_coord={state.cod_coord}
      nombre_coord={state.nombre_coord} />
  )
}

export default SetCoordinacionForm
