import React from 'react';

import clientAxios from '../../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, Fab,
  Tooltip, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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



function ActualizarCarrera({carrera, open, setOpen, estado, setEstado, user, }) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function onSubmitForm(state) {
    const data = {
      nombre_carrera: state.nombre_carrera.value,
      jornada: state.jornada.value
    }
    clientAxios(user.idToken).put(`/api/carrera/${carrera.id}`, data)
    .then(res => {
      setOpen(false)
      setEstado(!estado)
    })
  }

  return (
    <React.Fragment>
      <Tooltip title="Editar Carrera">
        <Fab color="secondary" size="small" aria-label="add" className={classes.margin}
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
        <DialogTitle id="max-width-dialog-title">Crear Carrera</DialogTitle>
        <DialogContent>
          <CarreraForm nombre_carrera={carrera.nombre_carrera}
            jornada={carrera.jornada} open={open} setOpen={setOpen} onSubmitForm={onSubmitForm}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ActualizarCarrera
