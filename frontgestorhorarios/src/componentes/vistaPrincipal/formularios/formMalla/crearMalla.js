import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MallaForm from './mallaForm'

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



function CrearMalla({carreraId, open, setOpen, estado, setEstado}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    const data = {
      carreraId,
      nombre_malla: state.nombre_malla.value,
      cod_malla: state.cod_malla.value,
      n_niveles: state.n_niveles.value
    }
    axios.post('http://localhost:8000/api/malla', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })
    .catch((error)=>{
      alert("error al crear la malla")
    })
    console.log(data);
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
        <DialogTitle id="max-width-dialog-title">Crear Malla</DialogTitle>
        <DialogContent>
          <MallaForm nombre_malla={''} cod_malla={''} n_niveles={0} estado={estado} setEstado={setEstado} onSubmitForm={onSubmitForm}/>
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

export default CrearMalla