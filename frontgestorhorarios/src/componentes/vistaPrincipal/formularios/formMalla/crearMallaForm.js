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

const CrearMallaForm = props => {
  const stateSchema = {
    cod_malla: { value: '', error: '' },
    nombre_malla: { value: '', error: '' },
    n_niveles: { value: 0, error: '' },
  };
  const validationStateSchema = {
    cod_malla: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_malla: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    n_niveles: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };
  function onSubmitForm(state) {
    const {carreraId} = props
    const num_niveles = parseInt(state.n_niveles.value)
    const data = {
      carreraId,
      nombre_malla: state.nombre_malla.value,
      cod_malla: state.cod_malla.value,
      n_niveles: num_niveles
    }
    axios.post('http://localhost:8000/api/malla', data)
    .then(res => {
      console.log(res.data);
    })
    console.log(data);
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
  const { onSubmit } = props
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          error = {state.cod_malla.error ? true : false}
          id="standard-name"
          label="Código de la malla"
          name="cod_malla"
          className={classes.textField}
          value={state.cod_malla.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <TextField
          error={state.nombre_malla.error ? true:false}
          id="standard-required"
          label="Nombre de la malla"
          name="nombre_malla"
          className={classes.textField}
          value={state.nombre_malla.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <TextField
          error={state.n_niveles.error ? true:false}
          id="standard-required"
          label="Número de niveles"
          name="n_niveles"
          type="number"
          className={classes.textField}
          value={state.n_niveles.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <br/>
        <br/>

        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default CrearMallaForm
