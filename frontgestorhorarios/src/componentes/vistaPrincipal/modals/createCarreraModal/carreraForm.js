import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Radio, RadioGroup, FormControlLabel, FormLabel, DialogContent,
  DialogActions, Grid, } from '@material-ui/core';

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

const CarreraForm = ({nombre, jornada, n_niveles, año, onSubmitForm, type, handleClose, }) => {

  const stateSchema = {
    nombre: { value: nombre, error: '' },
    jornada: { value: jornada ? jornada:"Vespertino", error: '' },
    año: { value: año, error: '' },
    n_niveles: { value: n_niveles, error: '' },
  };

  const validationStateSchema = {
    nombre: {
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
    año: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    n_niveles: {
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
        <Grid container>
          <Grid item xs={6}>
            <TextField
              error={state.nombre.error ? true:false}
              id="standard-required"
              label="Nombre de la carrera"
              name="nombre"
              value={state.nombre.value}
              onChange={handleOnChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={state.año.error ? true:false}
              id="standard-required"
              label="Año"
              name="año"
              value={state.año.value}
              onChange={handleOnChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <TextField
          error={state.n_niveles.error ? true:false}
          id="standard-required"
          label="Número de niveles"
          name="n_niveles"
          value={state.n_niveles.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
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
