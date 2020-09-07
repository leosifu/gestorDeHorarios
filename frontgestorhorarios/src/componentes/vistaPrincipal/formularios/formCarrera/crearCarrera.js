import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import clientAxios from '../../../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import AlertUnauthorized from '../../../utils/alertUnauthorized'

import CarreraForm from './carreraForm'

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



function CrearCarrera({open, setOpen, user, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    dispatch(setLoading(true))
    if (!state.nombre_carrera.value || !state.jornada.value) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        nombre_carrera: state.nombre_carrera.value,
        jornada: state.jornada.value
      }
      clientAxios(user.idToken).post('/api/carrera', data)
      .then(res => {
        console.log(res.data);
        setOpen(false);
        dispatch(setLoading(false));
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
    <React.Fragment>
      <Tooltip title="Crear Carrera">
        <Fab color="primary" size="small" aria-label="add" style={{backgroundColor: '#EA7600'}}
          onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        fullWidth={true}
        open={open}
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
        <CarreraForm nombre_carrera={''} jornada={"Vespertino"} open={open} setOpen={setOpen}
          onSubmitForm={onSubmitForm} handleClose={handleClose} type={'crear'}/>
      </Dialog>
    </React.Fragment>
  );
}

export default CrearCarrera
