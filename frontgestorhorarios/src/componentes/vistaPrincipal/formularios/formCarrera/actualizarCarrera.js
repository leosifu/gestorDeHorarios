import React from 'react';

import Swal from 'sweetalert2';

import clientAxios from '../../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogActions, DialogContent, Fab, Grid,
  Tooltip, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import CarreraForm from './carreraForm'
import PrimaryButton from '../../../utils/PrimaryButton';

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



function ActualizarCarrera({carrera, open, setOpen, estado, setEstado, user, }) {

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
      clientAxios(user.idToken).put(`/api/carrera/${carrera.id}`, data)
      .then(res => {
        setOpen(false)
        setEstado(!estado)
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Carrera actualizada'}
        ));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al actualizar la carrera'}
        ));
      })
    }
  }

  const EliminarCarrera = (event) => {
    Swal.fire({
      title: `Seguro que desea eliminar la carrera ${carrera.nombre_carrera}`,
      text: 'No se podrá recuperar',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#000',
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Aceptar'
    })
    .then(result=>{
      if (result.value) {
        clientAxios(user.idToken).delete(`/api/carrera/${carrera.id}`)
        .then(res => {
          setOpen(false)
          setEstado(!estado)
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'success',
            message: 'Carrera eliminada'}
          ));
        })
        .catch(error => {
          console.log(error);
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'error',
            message: 'Ocurrió un error al eliminar la carrera'}
          ));
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Tooltip title="Editar Carrera">
        <Fab color="secondary" size="small" aria-label="add" style={{backgroundColor: '#B1B1B1'}}
          onClick={handleClickOpen}>
          <EditIcon />
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
              Editar Carrera
            </Grid>
            <Grid item xs={4}>
              <PrimaryButton onClick={EliminarCarrera} title={'Eliminar Carrera'} />
            </Grid>
          </Grid>
        </DialogTitle>
        <CarreraForm nombre_carrera={carrera.nombre_carrera} handleClose={handleClose} type={'act'}
          jornada={carrera.jornada} open={open} setOpen={setOpen} onSubmitForm={onSubmitForm}/>
      </Dialog>
    </React.Fragment>
  );
}

export default ActualizarCarrera
