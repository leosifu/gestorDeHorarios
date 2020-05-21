import React, {useState, } from 'react'

import clientAxios from '../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, Menu, Fab, Tooltip, } from '@material-ui/core';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {handleDialogUpdateProceso, } from '../../../redux/actions';

import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OptionsList({currentProceso, user, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectNuevoProceso = () => {
    dispatch(push(`/nuevoProceso`))
  }

  const editProceso = () => {
    dispatch(handleDialogUpdateProceso(true));
  }

  const deleteProceso = () => {
    Swal.fire({
      title: `Seguro que desea eliminar el proceso ${currentProceso.semestre}/${currentProceso.año}`,
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
        clientAxios(user.idToken).delete(`/api/procesos/${currentProceso.id}`)
        .then(res=>{
          console.log(res);
          Swal.fire({
            title: 'Proceso Eliminado',
            type: 'warning',
            confirmButtonColor: '#000',
            confirmButtonText: 'Aceptar'
          })
        })
        .catch(error => {
          console.log(error);
          console.error(error);
          Swal.fire({
            title: 'No se pudo eliminar el proceso',
            type: 'warning',
            confirmButtonColor: '#000',
            confirmButtonText: 'Aceptar'
          })
        })
      }
    })
  }

  return (
    <div className={classes.root}>
      <Tooltip title="Opciones del Proceso">
        <Fab color="primary" size="small" aria-label="add" className={classes.margin}
          onClick={handleClick}>
          <BrightnessHighIcon />
        </Fab>
      </Tooltip>
      <Menu
        id="simple-menu"
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={redirectNuevoProceso}>Nuevo Proceso</MenuItem>
        <MenuItem onClick={editProceso}>Editar Proceso</MenuItem>
        <MenuItem onClick={deleteProceso}>Eliminar Proceso</MenuItem>
      </Menu>
    </div>
  );
}
