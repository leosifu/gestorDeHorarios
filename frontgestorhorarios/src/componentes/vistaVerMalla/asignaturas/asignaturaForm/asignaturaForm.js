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

import useForm from '../../../form/useForm'
import AsignarAsignaturaForm from './formsAsignatura/asignarAsignaturaForm'
import TelAsignaturaForm from './formsAsignatura/telAsignaturaForm'
import HistorialForm from './formsAsignatura/historialForm'

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

const AsignaturaForm = ({camposAsignatura, onSubmitForm, tipo}) => {

  const [stateC, ] = React.useState({
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
    lab_independiente: { value: stateC.checked, checked:camposAsignatura.lab_independiente,
      error: '' },
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
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    },
    tel_E: {
      validator: {
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    },
    tel_L: {
      validator: {
        regEx: /^[0-9]$/,
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

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  var sumaTel = true

  if (state.tel_T.value + state.tel_E.value + state.tel_L.value>0) {
    sumaTel = false
  }

  const classes = useStyles();
  return (
    <>
      <DialogContent>

        <AsignarAsignaturaForm handleOnChange={handleOnChange} cod_asignatura={state.cod_asignatura}
          nombre_asignatura={state.nombre_asignatura} />

        <TelAsignaturaForm handleOnChange={handleOnChange} tel_T={state.tel_T} tel_E={state.tel_E}
          tel_L={state.tel_L} lab_independiente={state.lab_independiente} />

        <HistorialForm handleOnChange={handleOnChange} cupos_pasados={state.cupos_pasados}
          tasa_reprobacion={state.tasa_reprobacion} />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnSubmit} disabled={disable?true:(sumaTel?true:false)}
          variant="contained" color="primary" className={classes.button}>
          {
            tipo===0?
            <>Crear Asignatura</>
            :
            <>Guardar Cambios</>
          }
        </Button>
      </DialogActions>
    </>
  );
};

export default AsignaturaForm
