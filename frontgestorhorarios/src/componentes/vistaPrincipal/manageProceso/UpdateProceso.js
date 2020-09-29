import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  FormControlLabel, Switch} from '@material-ui/core';

import clientAxios from '../../../config/axios';

import { useDispatch } from 'react-redux';
import {setLoading, handleDialogUpdateProceso, getProcesos,
  handleNotifications, } from '../../../redux/actions';

import ProcesoForm from './ProcesoForm';

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

function EditarProceso({proceso, estado, setEstado, dialogUpdateProceso, user, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmitForm = (state) => {
    dispatch(setLoading(true))
    if ((!state.semestre.value || state.semestre.value < 0)
      || (!state.año.value || state.año.value < 0)) {
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'info',
          message: 'Datos ingresados incompletos o incorrectos'}
        ));
    }
    else {
      const data = {
        año: state.año.value,
        semestre: state.semestre.value,
        estado: state.estado.value
      }
      clientAxios(user.idToken).put(`/api/procesos/${proceso.id}`, data)
      .then(res=>{
        dispatch(getProcesos(user.idToken));
        dispatch(handleDialogUpdateProceso(false));
        setEstado(!estado);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Proceso actualizado'}
        ));
      })
      .catch(error=>{
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al actualizar el proceso'}
        ));
      })
    }
  }

  const handleClose = () => {
    dispatch(handleDialogUpdateProceso(false));
  }

  return (
    <Dialog
      fullWidth={true}
      open={dialogUpdateProceso.open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        {proceso.año + ' ' + proceso.semestre}
      </DialogTitle>
      <DialogContent>
        <ProcesoForm año={proceso.año} semestre={proceso.semestre} estado={proceso.estado}
          onSubmitForm={onSubmitForm}/>
      </DialogContent>
    </Dialog>
  );
}

export default EditarProceso
