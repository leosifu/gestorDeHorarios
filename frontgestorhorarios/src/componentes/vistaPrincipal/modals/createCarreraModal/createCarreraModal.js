import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import clientAxios from '../../../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading, handleDialogCarrera, handleNotifications, } from '../../../../redux/actions';

import AlertUnauthorized from '../../../utils/alertUnauthorized';

import CarreraForm from './carreraForm';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const CreateCarreraModal = ({user, dialogCarrera, currentProceso, setChanged, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => dispatch(handleDialogCarrera());

  const onSubmitForm = (state) => {
    dispatch(setLoading(true))
    if (!state.nombre.value || !state.jornada.value || !state.año.value || !state.n_niveles.value) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        nombre: state.nombre.value,
        jornada: state.jornada.value,
        año: state.año.value,
        n_niveles: state.n_niveles.value,
        procesoId: currentProceso.id
      }
      clientAxios(user.idToken).post('/api/carrera', data)
      .then(res => {
        dispatch(setLoading(false));
        setChanged(changed => !changed);
        dispatch(handleDialogCarrera());
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Carrera Creada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al crear la carrera'}
        ));
      })
    }
  }

  const onSubmitFormEdit = (state) => {
    dispatch(setLoading(true))
    if (!state.nombre.value || !state.jornada.value || !state.año.value || !state.n_niveles.value) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        nombre: state.nombre.value,
        jornada: state.jornada.value,
        año: state.año.value,
        n_niveles: state.n_niveles.value,
      }
      clientAxios(user.idToken).put(`/api/carrera/${dialogCarrera.selectedCarrera.id}`, data)
      .then(res => {
        dispatch(setLoading(false));
        setChanged(changed => !changed);
        dispatch(handleDialogCarrera());
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Carrera Creada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al crear la carrera'}
        ));
      })
    }
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        open={dialogCarrera.open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <Grid container>
            <Grid item xs={8}>
              Crear Carrera
            </Grid>
          </Grid>
        </DialogTitle>
        <CarreraForm nombre={dialogCarrera.type === 'create' ? '' : dialogCarrera.selectedCarrera.nombre}
          jornada={dialogCarrera.type === 'create' ? "Vespertino" : dialogCarrera.selectedCarrera.jornada}
          n_niveles={dialogCarrera.type === 'create' ? 0 : dialogCarrera.selectedCarrera.n_niveles}
          año={dialogCarrera.type === 'create' ? 0 : dialogCarrera.selectedCarrera.año}
          onSubmitForm={dialogCarrera.type === 'create' ? onSubmitForm : onSubmitFormEdit}
          handleClose={handleClose} type={dialogCarrera.type === 'create' ? 'crear' : 'editar'}
        />
      </Dialog>
    </>
  )
}

export default CreateCarreraModal;
