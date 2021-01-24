import React from 'react'

import clientAxios from '../../../../config/axios'

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import PrimaryButton from '../../../utils/PrimaryButton';

import DatosCoordForm from './coordinacionForm/datosCoordForm'
import useForm from '../../../form/useForm'

const SetCoordinacionForm = ({coordinacion, asignaturaAct, estado, setEstado, user, setCrear, }) => {

  const dispatch = useDispatch();

  const stateSchema = {
    cod_coord: { value: coordinacion.cod_coord, error: '' },
    nombre_coord: { value: coordinacion.nombre_coord, error: '' },
  };

  const validationStateSchema = {
    cod_coord: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_coord: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };

  const onSubmitForm = event=>{
    dispatch(setLoading(true));
    if (!state.cod_coord.value || !state.nombre_coord.value) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        asignaturaId: asignaturaAct.id,
        coordinacionId: coordinacion.coordinacionId,
        nombre_coord: state.nombre_coord.value,
        cod_coord: state.cod_coord.value
      }
      clientAxios(user.idToken).post(`/api/asigncoord`, data)
      .then(res=>{
        setEstado(!estado)
        setCrear(false)
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Coordinación asignada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al asignar la coordinación'}
        ));
      })
    }
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
      <PrimaryButton
        onClick={handleOnSubmit}
        title={'Asociar Coordinacion'}
      />
    </>
  )
}

export default SetCoordinacionForm
