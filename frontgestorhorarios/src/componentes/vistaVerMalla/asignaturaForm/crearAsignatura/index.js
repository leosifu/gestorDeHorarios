import React, {useState} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import AsignaturaForm from '../asignaturaForm'
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

function CrearAsignatura({open, setOpen, estado, setEstado, nivel, mallaId}){

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton className={classes.centrarIcon} onClick={handleClickOpen}>
        <AddCircleOutlineOutlinedIcon fontSize='large' style={{color:"blue"}}/>
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
          mallaId={mallaId}/>
      </Dialog>
    </React.Fragment>
  );
}

export default CrearAsignatura
