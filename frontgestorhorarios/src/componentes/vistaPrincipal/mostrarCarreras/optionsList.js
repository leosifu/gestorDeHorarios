import React, {useState, } from 'react'

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, Menu, Fab, } from '@material-ui/core';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OptionsList() {

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

  return (
    <div className={classes.root}>
      <Fab color="primary" size="small" aria-label="add" className={classes.margin}
        onClick={handleClick}>
        <BrightnessHighIcon />
      </Fab>
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
        <MenuItem onClick={handleClose}>Editar Proceso</MenuItem>
        <MenuItem onClick={handleClose}>Eliminar Proceso</MenuItem>
      </Menu>
    </div>
  );
}
