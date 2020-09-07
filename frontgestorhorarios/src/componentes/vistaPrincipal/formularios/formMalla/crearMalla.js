import React, {useState} from 'react';

import clientAxios from '../../../../config/axios'

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

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

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    dispatch(setLoading(true))
    if (!state.cod_malla.value || (state.n_niveles.value < 1)) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        carreraId,
        cod_malla: state.cod_malla.value,
        fecha_resolucion: selectedDate,
        n_niveles: state.n_niveles.value,
        procesoId: currentProceso.id
      }
      clientAxios(user.idToken).post('/api/malla', data)
      .then(res => {
        setOpen(false);
        setEstado(!estado);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Malla creada'}
        ));
      })
      .catch((error)=>{
        setOpen(false);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al crear la malla'}
        ));
      });
    }
  }

  return (
    <>
      <Tooltip title="Agregar Malla">
        <Fab color="primary" size="small" aria-label="add" style={{backgroundColor: '#EA7600'}}
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
        <MallaForm cod_malla={''} fecha_resolucion={selectedDate} n_niveles={0} estado={estado}
          año={0} semestre={0} setEstado={setEstado} onSubmitForm={onSubmitForm} type={'crear'}
          handleClose={handleClose} setSelectedDate={setSelectedDate}/>
      </Dialog>
    </>
  );
}

export default CrearMalla
