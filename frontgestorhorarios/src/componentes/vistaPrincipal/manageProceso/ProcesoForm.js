import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {DialogActions, } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import PrimaryButton from '../../utils/PrimaryButton'
import TextField from '../../utils/TextField'

import useForm from '../../form/useForm'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

const ProcesoForm = ({año, semestre, estado, onSubmitForm, edit, activa}) => {

  const classes = useStyles();

  const stateSchema = {
    año: {value: año, error: ''},
    semestre: {value: semestre, error: ''},
    estado: {value: estado, error: ''}
  };

  const validationStateSchema = {
    año: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    semestre: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    estado: {
      required: true,
    },
  };

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const disable = año > 0 && semestre > 0

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          error={state.año.error ? true:false}
          label="Año del Proceso"
          name="año"
          type="number"
          value={state.año.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          error={state.semestre.error ? true:false}
          label="Semestre del Proceso"
          name="semestre"
          type="number"
          value={state.semestre.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Estado del Proceso</FormLabel>
          <RadioGroup name="estado" value={state.estado.value} onChange={handleOnChange}>
            <FormControlLabel value="active" control={<Radio />} label="Proceso Activo" />
            <FormControlLabel value="creating" control={<Radio />} label="Creando Proceso" />
            <FormControlLabel value="finished" control={<Radio />} label="Proceso Terminado" />
          </RadioGroup>
        </FormControl>
        <DialogActions>
          <PrimaryButton onClick={handleOnSubmit} title={'Actualizar Proceso'} />
        </DialogActions>
      </form>
    </div>
  );
};

export default ProcesoForm
