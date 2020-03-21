import React from 'react'

import clientAxios from '../../../../config/axios'

import {Button} from '@material-ui/core';

import DatosCoordForm from './coordinacionForm/datosCoordForm'
import useForm from '../../../form/useForm'

const SetCoordinacionForm = ({coordinacion, asignaturaAct, estado, setEstado, }) => {

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

  const onSubmitForm = event=>{
    var data = {
      asignaturaId: asignaturaAct.id,
      coordinacionId: coordinacion.coordinacionId,
      nombre_coord: state.nombre_coord.value,
      cod_coord: state.cod_coord.value
    }
    clientAxios().post(`/api/asigncoord`, data)
    .then(res=>{
      console.log(res.data);
      setEstado(!estado)
    })
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return(
    <>
      <DatosCoordForm handleOnChange={handleOnChange} cod_coord={state.cod_coord}
        nombre_coord={state.nombre_coord} />
      <Button
        onClick={handleOnSubmit}
        variant="contained" color="primary">
        Asociar Coordinacion
      </Button>
    </>
  )
}

export default SetCoordinacionForm
