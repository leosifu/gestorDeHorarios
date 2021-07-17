import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import clientAxios from '../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading, handleDialogNuevoProceso, handleNotifications, } from '../../redux/actions';

import AlertUnauthorized from '../utils/alertUnauthorized';

import NuevoProceso from './nuevoProceso';

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

const NuevoProcesoModal = ({user, dialogNuevoProceso, currentProceso, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => dispatch(handleDialogNuevoProceso());

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={dialogNuevoProceso.open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <Grid container>
            <Grid item xs={8}>
              Nuevo Proceso
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <NuevoProceso />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NuevoProcesoModal;
