import React from 'react';

import clientAxios from '../../../../config/axios'

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import {setLoading} from '../../../../redux/actions'

import MallaForm from './mallaForm'

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
      carreraId,
      nombre_malla: state.nombre_malla.value,
      res_malla: state.res_malla.value,
      n_niveles: state.n_niveles.value,
      año: state.año.value,
      semestre: state.semestre.value,
    }
    clientAxios().post('/api/malla', data)
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
    <>
      <Fab color="primary" size="small" aria-label="add" className={classes.margin}
        onClick={handleClickOpen}>
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
          <MallaForm nombre_malla={''} res_malla={''} n_niveles={0} estado={estado} año={0} semestre={0}
            setEstado={setEstado} onSubmitForm={onSubmitForm}/>
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

export default CrearMalla
