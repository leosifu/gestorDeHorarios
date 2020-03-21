import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

import useForm from '../../../../form/useForm'
import AsignarAsignaturaForm from '../formsAsignatura/asignarAsignaturaForm'

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

const AsignarAsignaturaCampos = ({camposAsignatura, onSubmitForm}) => {

  const stateSchema = {
    cod_asignatura: { value: camposAsignatura.cod_asignatura, error: '' },
    nombre_asignatura: { value: camposAsignatura.nombre_asignatura, error: '' },
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
  };

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const classes = useStyles();
  return (
    <>
      <DialogContent>
        <AsignarAsignaturaForm handleOnChange={handleOnChange} cod_asignatura={state.cod_asignatura}
          nombre_asignatura={state.nombre_asignatura} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnSubmit}
          variant="contained" color="primary" className={classes.button}>
          Asignar Asignatura
        </Button>
      </DialogActions>
    </>
  );
};

export default AsignarAsignaturaCampos
