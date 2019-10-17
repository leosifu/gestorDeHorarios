import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useForm from '../useForm'

import axios from 'axios';

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

const CrearCarreraForm = props => {
  const stateSchema = {
    cod_carrera: { value: '', error: '' },
    nombre_carrera: { value: '', error: '' },
    jornada: { value: "Vespertino", error: '' },
  };
  const validationStateSchema = {
    cod_carrera: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_carrera: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    jornada: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };
  function onSubmitForm(state) {
    const data = {
      nombre_carrera: state.nombre_carrera.value,
      cod_carrera: state.cod_carrera.value,
      jornada: state.jornada.value
    }
    axios.post('http://localhost:8000/api/carrera', data)
    .then(res => {
      console.log(res.data);
    })
    console.log(state);
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );
  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  };
  const { onSubmit } = props;
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          error = {state.cod_carrera.error ? true : false}
          id="standard-name"
          label="Código de la carrera"
          name="cod_carrera"
          className={classes.textField}
          value={state.cod_carrera.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <TextField
          error={state.nombre_carrera.error ? true:false}
          id="standard-required"
          label="Nombre de la carrera"
          name="nombre_carrera"
          className={classes.textField}
          value={state.nombre_carrera.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <br/>
        <br/>
        <FormLabel component="legend">Jornada</FormLabel>
        <RadioGroup aria-label="Jornada" name="jornada" value={state.jornada.value} onChange={handleOnChange}>
          <FormControlLabel value="Vespertino" control={<Radio />} label="Vespertino" />
          <FormControlLabel value="Diurno" control={<Radio />} label="Diurno" />
        </RadioGroup>
        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default CrearCarreraForm
