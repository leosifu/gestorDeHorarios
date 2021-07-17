import React, {useRef, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Box, DialogActions, Grid, } from '@material-ui/core';

import PrimaryButton from '../../../../utils/PrimaryButton';
import SecondaryButton from '../../../../utils/SecondaryButton';

import useForm from '../../../../form/useForm';
import DatosCoordForm from './datosCoordForm';
import EspecCoordForm from './especCoordForm';
import AsignarProfesor from './asignarProfesor';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
    padding: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  campoDes:{
    marginBottom: 5,
    padding: 10,
  },
}));

function CoordinacionForm({camposCord, onSubmitForm, profesoresSelect, setProfesoresSelect, user,
  profesores, edit, currentProceso, cancelarEdit, eliminarCoordinacion, cancelar, }){
  const classes = useStyles();
  const [age, setAge] = useState('');

  const inputLabel = useRef(null);

  const handleChange = event => {
    setAge(event.target.value);
  };

  const stateSchema = {
    cod_coord: { value: camposCord.cod_coord, error: '' },
    nombre_coord: { value: camposCord.nombre_coord, error: '' },
    tipo_coord: { value: camposCord.tipo_coord, error: '' },
    num_bloques: { value: camposCord.num_bloques, error: '' },
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
    tipo_coord: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    num_bloques: {
      validator: {
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    }
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  let isDisabled = (!camposCord.cod_coord && !camposCord.nombreCoord && !camposCord.tipo_coord)

  return(
    <>
      <Box className={classes.sector} borderRadius={1} boxShadow={2}>
        <Typography variant="h6" component="h3" className={classes.campoDes}>
          Datos de la Asignatura
        </Typography>

        <DatosCoordForm handleOnChange={handleOnChange} cod_coord={state.cod_coord}
          nombre_coord={state.nombre_coord} />

        <AsignarProfesor profesoresSelect={profesoresSelect} user={user} currentProceso={currentProceso}
          setProfesoresSelect={setProfesoresSelect} showProfesores={profesores} />

        <EspecCoordForm handleOnChange={handleOnChange} tipo_coord={state.tipo_coord}
          num_bloques={state.num_bloques}/>

          <DialogActions>
        {
          edit ?
            <>
              <SecondaryButton onClick={cancelarEdit} disabled={isDisabled} title={'Cancelar'} />
              <PrimaryButton onClick={eliminarCoordinacion} disabled={isDisabled}
                title={'Eliminar Coordinación'} />
              <PrimaryButton onClick={handleOnSubmit} disabled={isDisabled}
                title={'Editar Coordinación'} />
            </>
          :
            <>
              <SecondaryButton onClick={cancelar} disabled={isDisabled} title={'Cancelar'} />
              <PrimaryButton onClick={handleOnSubmit} disabled={disable} title={'Crear Coordinación'} />
            </>
        }
        </DialogActions>
      </Box>
    </>
  )
}
export default CoordinacionForm
