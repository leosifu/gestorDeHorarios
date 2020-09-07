import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Radio, RadioGroup, FormControlLabel, FormLabel, DialogContent,
  DialogActions, } from '@material-ui/core';

import TextField from '../../../utils/TextField';
import PrimaryButton from '../../../utils/PrimaryButton';
import SecondaryButton from '../../../utils/SecondaryButton';

import useForm from '../../../form/useForm'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CarreraForm = ({nombre_carrera, jornada, onSubmitForm, type, handleClose, }) => {

  const stateSchema = {
    nombre_carrera: { value: nombre_carrera, error: '' },
    jornada: { value: jornada ? jornada:"Vespertino", error: '' },
  };

  const validationStateSchema = {
    nombre_carrera: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    jornada: {
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

  const classes = useStyles();
  return (
    <>
      <DialogContent>
        <TextField
          error={state.nombre_carrera.error ? true:false}
          id="standard-required"
          label="Nombre de la carrera"
          name="nombre_carrera"
          value={state.nombre_carrera.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <br/>
        <FormLabel component="legend">Jornada</FormLabel>
        <RadioGroup aria-label="Jornada" name="jornada" value={state.jornada.value}
          onChange={handleOnChange}>
          <FormControlLabel value="Vespertino" control={<Radio />} label="Vespertino" />
          <FormControlLabel value="Diurno" control={<Radio />} label="Diurno" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={handleOnSubmit}
          title={type === 'crear' ? 'Crear Carrera' : 'Actualizar Carrera'} />
        <SecondaryButton onClick={handleClose} title={'Cerrar'} />
      </DialogActions>
    </>
  );
};

export default CarreraForm
