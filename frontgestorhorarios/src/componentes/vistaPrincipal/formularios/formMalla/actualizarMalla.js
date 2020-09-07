import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';

import clientAxios from '../../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid,
  Tooltip, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions'

import MallaForm from './mallaForm'
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



function ActualizarMalla({malla, open, setOpen, estado, setEstado, user, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedDate(malla.fecha_resolucion);
  }, [malla]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    dispatch(setLoading(true));
    if (!state.cod_malla.value || (state.n_niveles.value < 1)) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        cod_malla: state.cod_malla.value,
        fecha_resolucion: selectedDate,
        n_niveles: state.n_niveles.value
      }
      clientAxios(user.idToken).put(`/api/malla/${malla.id}`, data)
      .then(res => {
        console.log(res.data);
        setOpen(false);
        setEstado(!estado);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Malla actualizada'}
        ));
      })
      .catch((error)=>{
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al actualizar la malla'}
        ));
      });
    }
  }

  const EliminarMalla = (event) => {
    Swal.fire({
      title: `Seguro que desea eliminar la malla ${malla.cod_malla}`,
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
        clientAxios(user.idToken).delete(`/api/malla/${malla.id}`)
        .then(res => {
          setOpen(false)
          setEstado(!estado)
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'success',
            message: 'Malla eliminada'}
          ));
        })
        .catch(error => {
          console.log(error);
          dispatch(setLoading(false))
          dispatch(handleNotifications(true, {
            status: 'error',
            message: 'Ocurrió un error al eliminar la malla'}
          ));
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Tooltip title="Editar Malla">
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
              Editar Malla
            </Grid>
            <Grid item xs={4}>
              <PrimaryButton onClick={EliminarMalla} title={'Eliminar Malla'} />
            </Grid>
          </Grid>
        </DialogTitle>
        <MallaForm cod_malla={malla.cod_malla} fecha_resolucion={selectedDate}
          n_niveles={malla.n_niveles} estado={estado} setEstado={setEstado} onSubmitForm={onSubmitForm}
          handleClose={handleClose} setSelectedDate={setSelectedDate} />
      </Dialog>
    </React.Fragment>
  );
}

export default ActualizarMalla
