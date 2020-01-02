import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  FormControlLabel, Switch} from '@material-ui/core';

import ProcesoForm from './procesoForm'

import axios from 'axios';

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



function EditarProceso({open, setOpen, proceso}) {

  const classes = useStyles();

  const [activa, setActiva] = useState(proceso.activa?true:false)

  const handleOnChange = (event) => {
    setActiva(event.target.checked)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitForm = () => {
    console.log(activa);
    axios.put(`http://localhost:8000/api/malla/estado/${proceso.id}`, {activa: activa})
    .then(res=>{
      console.log(res);
      setOpen(false)
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <>
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Editar Proceso
        </Button>
      </Grid>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {proceso.nombre_malla + ' ' + proceso.año + ' ' + proceso.semestre}
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={activa}
                onChange={handleOnChange}
                value={activa}
                color="primary"
                name="activa"
              />
            }
            label="Proceso activo"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitForm} color="primary">
            Actualizar Malla
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditarProceso
