import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CarreraForm from './carreraForm'

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



function CrearCarrera({open, setOpen}) {
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
      cod_carrera: state.cod_carrera.value,
      jornada: state.jornada.value
    }
    axios.post('http://localhost:8000/api/carrera', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
    })

  }

  return (
    <React.Fragment>
      <Fab color="primary" size="small" aria-label="add" className={classes.margin} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Crear Carrera
        </DialogTitle>
        <DialogContent>
          <CarreraForm cod_carrera={''} nombre_carrera={''} jornada={"Vespertino"} open={open} setOpen={setOpen} onSubmitForm={onSubmitForm}/>
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

export default CrearCarrera