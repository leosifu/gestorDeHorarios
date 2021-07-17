import React, {useState, } from 'react';

import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import PrimaryButton from '../../../../utils/PrimaryButton';
import SecondaryButton from '../../../../utils/SecondaryButton';
import TextField from '../../../../utils/TextField';

import useForm from '../../../../form/useForm'
import HistorialForm from '../formsAsignatura/historialForm'

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

const EditHistorial = ({historialAsignatura, onSubmitForm, cancelAction, }) => {

  const classes = useStyles();

  const stateSchema = {
    cupos_pasados: { value: historialAsignatura.cupos_pasados, error: '' },
    tasa_reprobacion: { value: historialAsignatura.tasa_reprobacion, error: '' },
    desinscripciones: {value: historialAsignatura.desinscripciones, error: ''}
  };
  const validationStateSchema = {
    cupos_pasados: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tasa_reprobacion: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    desinscripciones: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    }
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <>
      <DialogContent>

        <HistorialForm handleOnChange={handleOnChange} cupos_pasados={state.cupos_pasados}
          tasa_reprobacion={state.tasa_reprobacion} desinscripciones={state.desinscripciones}
        />

      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={handleOnSubmit} title={'Guardar cambios'} />

        <SecondaryButton onClick={cancelAction} title={'Cancelar'} />

      </DialogActions>
    </>
  );
};

export default EditHistorial;
