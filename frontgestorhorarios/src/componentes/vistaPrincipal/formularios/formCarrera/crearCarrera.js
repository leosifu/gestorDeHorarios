import React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab,
  Tooltip, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import clientAxios from '../../../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading} from '../../../../redux/actions'

import AlertUnauthorized from '../../../utils/alertUnauthorized'

import CarreraForm from './carreraForm'

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



function CrearCarrera({open, setOpen, user, }) {

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
      nombre_carrera: state.nombre_carrera.value,
      jornada: state.jornada.value
    }
    clientAxios(user.idToken).post('/api/carrera', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      dispatch(setLoading(false))
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('wii');
          AlertUnauthorized()
        }
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      dispatch(setLoading(false))
    })

  }

  return (
    <React.Fragment>
      <Tooltip title="Crear Carrera">
        <Fab color="primary" size="small" aria-label="add" className={classes.margin} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
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
          <CarreraForm nombre_carrera={''} jornada={"Vespertino"} open={open} setOpen={setOpen} onSubmitForm={onSubmitForm}/>
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
