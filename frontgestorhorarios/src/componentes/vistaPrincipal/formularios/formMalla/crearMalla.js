import React from 'react';

import clientAxios from '../../../../config/axios'

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
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

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
)

function CrearMalla({carreraId, open, setOpen, estado, setEstado, user, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const currentProceso = useSelector(ProcesoSelector);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    dispatch(setLoading(true))
    console.log(currentProceso);
    const data = {
      carreraId,
      cod_malla: state.cod_malla.value,
      res_malla: state.res_malla.value,
      n_niveles: state.n_niveles.value,
      procesoId: currentProceso.id
    }
    clientAxios(user.idToken).post('/api/malla', data)
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
      <Tooltip title="Agregar Malla">
        <Fab color="primary" size="small" aria-label="add" className={classes.margin}
          onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Crear Malla</DialogTitle>
        <DialogContent>
          <MallaForm cod_malla={''} res_malla={''} n_niveles={0} estado={estado} año={0} semestre={0}
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
