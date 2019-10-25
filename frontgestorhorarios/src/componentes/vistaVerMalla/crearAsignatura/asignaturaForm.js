import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import useForm from '../../form/useForm'


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
  textFieldNumber:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
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
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
  },
  campoDes:{
    marginBottom: 10,
    padding: 10,
  },
  descripcion:{
    margin: 10,
    padding: 10,
    height: '4rem',
  },
  titulo:{
    margin: 10,
    padding: 10,
  }
}));

const AsignaturaForm = ({cod_asignatura, tel_T, tel_E, tel_L, nombre_asignatura, onSubmitForm}) => {


  const stateSchema = {
    cod_asignatura: { value: cod_asignatura, error: '' },
    nombre_asignatura: { value: nombre_asignatura, error: '' },
    tel_T: { value: tel_T, error: '' },
    tel_E: { value: tel_E, error: '' },
    tel_L: { value: tel_L, error: '' },
  };
  const validationStateSchema = {
    cod_asignatura: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_asignatura: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_T: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_E: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_L: {
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

  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
          <TextField
            error = {state.cod_asignatura.error ? true : false}
            id="standard-name"
            label="Código de la asignatura"
            name="cod_asignatura"
            className={classes.textField}
            value={state.cod_asignatura.value}
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            error = {state.cod_asignatura.error ? true : false}
            id="standard-name"
            label="Nombre de la asignatura"
            name="nombre_asignatura"
            className={classes.textField}
            value={state.nombre_asignatura.value}
            onChange={handleOnChange}
            margin="normal"
          />

          <TextField
            id="standard-name"
            label="Descripción"

            className={classes.textField}
            margin="normal"
          />

          <Grid container>
            <Grid item xs={3}>
              <Typography className={classes.campoDes}>
                TEL:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                error={state.tel_T.error ? true:false}
                id="standard-required"
                label="Teoría"
                name="tel_T"
                type="number"
                className={classes.textFieldNumber}
                value={state.tel_T.value}
                onChange={handleOnChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                error={state.tel_E.error ? true:false}
                id="standard-required"
                label="Ejercicios"
                name="tel_E"
                type="number"
                className={classes.textFieldNumber}
                value={state.tel_E.value}
                onChange={handleOnChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                error={state.tel_L.error ? true:false}
                id="standard-required"
                label="Laboratorio"
                name="tel_L"
                type="number"
                className={classes.textFieldNumber}
                value={state.tel_L.value}
                onChange={handleOnChange}
                margin="normal"
              />
            </Grid>
          </Grid>

        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default AsignaturaForm
