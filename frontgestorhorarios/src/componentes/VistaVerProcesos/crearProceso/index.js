import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, } from '@material-ui/core';

import clientAxios from '../../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading} from '../../../redux/actions'

import ProcesoForm from './procesoForm'

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

function CrearProceso({proceso, open, setOpen, changed, setChanged, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    dispatch(setLoading(true))
    const data = {
      año: state.año.value,
      semestre: state.semestre.value,
    }
    console.log(data);
    clientAxios().post('/api/nuevoProceso', data)
    .then(res=>{
      console.log(res.data);
      setChanged(!changed)
      setOpen(false)
    })
    .catch((error)=>{
      alert("error al crear la proceso")
    })
  }

  return (
    <>
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
        <Button
            className="whitespace-no-wrap"
            variant="contained"
            // disabled={edit?(formEdited?!canBeSubmitted():true):false }
            onClick={handleClickOpen}
        >
          Nuevo Proceso
        </Button>
      </Grid>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Crear Malla</DialogTitle>
        <DialogContent>
          <ProcesoForm año={0} semestre={0} onSubmitForm={onSubmitForm}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CrearProceso