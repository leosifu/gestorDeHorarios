import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import useForm from '../../form/useForm'


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
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

const AsignaturaForm = ({camposAsignatura, onSubmitForm}) => {

  const [stateC, setStateC] = React.useState({
    checked: camposAsignatura.lab_independiente,
  });

  const stateSchema = {
    cod_asignatura: { value: camposAsignatura.cod_asignatura, error: '' },
    nombre_asignatura: { value: camposAsignatura.nombre_asignatura, error: '' },
    tel_T: { value: camposAsignatura.tel_T, error: '' },
    tel_E: { value: camposAsignatura.tel_E, error: '' },
    tel_L: { value: camposAsignatura.tel_L, error: '' },
    cupos_pasados: { value: camposAsignatura.cupos_pasados, error: '' },
    tasa_reprobacion: { value: camposAsignatura.tasa_reprobacion, error: '' },
    lab_independiente: { value: stateC.checked, checked:camposAsignatura.lab_independiente, error: '' },
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
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_E: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_L: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    cupos_pasados: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tasa_reprobacion: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    lab_independiente:{
    }
  };

  const handleChange = name => event => {
    setStateC({ ...state, [name]: event.target.checked });
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
        <Typography variant="h6" component="h3" className={classes.campoDes}>
          Datos de la Asignatura
        </Typography>
        <Divider />
        <TextField
          error = {state.cod_asignatura.error ? true : false}
          id="standard-name"
          label="Código de la asignatura"
          name="cod_asignatura"
          className={classes.textField}
          value={state.cod_asignatura.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
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
          variant="outlined"
        />


        <Grid container>
          <Grid item xs={2}>
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Switch
              checked={state.lab_independiente.checked}
              onChange={handleOnChange}
              value={state.lab_independiente.checked}
              color="primary"
              name="lab_independiente"
            />
          }
          label="Laboratorio independiente"
        />

        <Typography variant="h6" component="h3" className={classes.campoDes}>
          Historial
        </Typography>
        <TextField
          error={state.tel_L.error ? true:false}
          id="standard-required"
          label="Cupos del semestre pasado"
          name="cupos_pasados"
          type="number"
          className={classes.textField}
          value={state.cupos_pasados.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          error={state.tel_L.error ? true:false}
          id="standard-required"
          label="Tasa de reprobación de la asignatura"
          name="tasa_reprobacion"
          type="number"
          className={classes.textField}
          value={state.tasa_reprobacion.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <br/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnSubmit} disabled={disable} variant="contained" color="primary" className={classes.button}>
          Crear Asignatura
        </Button>
      </DialogActions>
    </>
  );
};

export default AsignaturaForm
