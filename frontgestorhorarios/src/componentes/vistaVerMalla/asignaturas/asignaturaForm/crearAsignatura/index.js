import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import Eleccion from './eleccion'

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
  centrarIcon:{
    marginTop:'30%',
    marginLeft: '20%',
    color:'blue'
  },
}));

function CrearAsignatura({open, setOpen, estado, setEstado, nivel, carreraId, user, currentProceso, }){

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton className={classes.centrarIcon} onClick={handleClickOpen}>
        <AddCircleOutlineOutlinedIcon fontSize='large' style={{color:"#002F6C"}}/>
      </IconButton>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Crear Asignatura
        </DialogTitle>
        <Eleccion open={open} setOpen={setOpen} nivel={nivel} estado={estado} setEstado={setEstado}
          carreraId={carreraId} user={user} cancelAction={handleClose} currentProceso={currentProceso}
        />
      </Dialog>
    </>
  );
}

export default CrearAsignatura
