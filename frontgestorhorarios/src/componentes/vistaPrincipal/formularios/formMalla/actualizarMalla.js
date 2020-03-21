import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MallaForm from './mallaForm'

import clientAxios from '../../../../config/axios'

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



function ActualizarMalla({malla, open, setOpen, estado, setEstado}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    const data = {
      nombre_malla: state.nombre_malla.value,
      res_malla: state.res_malla.value,
      n_niveles: state.n_niveles.value
    }
    clientAxios().put(`/api/malla/${malla.id}`, data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })
    .catch((error)=>{
      console.log(error);
    })
    console.log(data);
  }

  return (
    <React.Fragment>
      <Fab color="secondary" size="small" aria-label="add" className={classes.margin} onClick={handleClickOpen}>
        <EditIcon />
      </Fab>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Crear Malla</DialogTitle>
        <DialogContent>
          <MallaForm nombre_malla={malla.nombre_malla} res_malla={malla.res_malla} n_niveles={malla.n_niveles} estado={estado} setEstado={setEstado} onSubmitForm={onSubmitForm}/>
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

export default ActualizarMalla
