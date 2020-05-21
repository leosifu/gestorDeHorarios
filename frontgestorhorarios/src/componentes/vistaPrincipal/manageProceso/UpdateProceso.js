import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  FormControlLabel, Switch} from '@material-ui/core';

import clientAxios from '../../../config/axios';

import { useDispatch } from 'react-redux';
import {setLoading, handleDialogUpdateProceso, getProcesos, } from '../../../redux/actions';

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
    const data = {
      año: state.año.value,
      semestre: state.semestre.value,
      estado: state.estado.value
    }
    console.log(data);
    clientAxios(user.idToken).put(`/api/procesos/${proceso.id}`, data)
    .then(res=>{
      console.log(res);
      dispatch(getProcesos(user.idToken));
      dispatch(handleDialogUpdateProceso(false));
      setEstado(!estado);
    })
    .catch(error=>{
      console.log(error);
    })
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
