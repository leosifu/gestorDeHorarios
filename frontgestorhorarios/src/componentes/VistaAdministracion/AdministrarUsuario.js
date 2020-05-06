import React, {useState, } from 'react';

import {Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleDialogCreate, } from '../../redux/actions'

const DialosUsuarioSelector = createSelector(
  state => state.dialogUsuario,
  dialogUsuario => dialogUsuario
);

const AdministrarUsuario = () => {

  const dispatch = useDispatch();
  const dialogUsuario = useSelector(DialosUsuarioSelector);

  return (
    <div>
      <Dialog open={dialogUsuario.open} onClose={() => {}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(handleDialogCreate(false))} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdministrarUsuario;
