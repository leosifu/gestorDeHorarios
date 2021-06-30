import React, {useState, useEffect, } from 'react';

import axios from 'axios';
import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Tooltip, Fab, Popover, } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, setProcesoActivo, handleNotifications, handleRightBar, } from '../../redux/actions'

import TablaCarreras from './tablaCarreras/tablaCarreras';
import CreateCarreraModal from './modals/createCarreraModal/createCarreraModal';
import SelectProceso from '../VistaNuevoProceso/selectProceso';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '5%',
    textAlign: 'center'
  },
}));

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso
);

const DialogCarreraSelector = createSelector(
  state => state.dialogCarrera,
  dialogCarrera => dialogCarrera
);

const DialogProcesoSelector = createSelector(
  state => state.dialogUpdateProceso,
  dialogUpdateProceso => dialogUpdateProceso
);

const UserSelector = createSelector(
  state => state.user,
  user => user
);

// const carreras = [
//   {
//     name: 'Ingeniería Civil Diurno 2020',
//     id: 1
//   },
//   {
//     name: 'Ingeniería Ejecución Diurno 2020',
//     id: 2
//   },
//   {
//     name: 'Ingeniería Ejecución Vespertino 2020',
//     id: 3
//   },
//   {
//     name: 'Ingeniería Civil Vespertino 2020',
//     id: 4
//   }
// ]

const VistaPrincipal = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userRedux = useSelector(UserSelector);
  const procesosData = useSelector(ProcesosSelector);
  const dialogCarrera = useSelector(DialogCarreraSelector);

  const user = userRedux.user;
  const procesos = procesosData.procesos;
  const currentProceso = procesosData.currentProceso;

  const [carreras, setCarreras] = useState([]);
  const [changed, setChanged] = useState(false);
  const [date, setDate] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    if (currentProceso.id >= 0) {
      clientAxios(user.idToken).get(`/api/carrera/${currentProceso.id}`)
      .then(res => {
        console.log(res.data);
        setCarreras(res.data);
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar las carreras proceso'}
        ));
      })
    }
    else {
      dispatch(setLoading());
    }
  }, [currentProceso, procesosData, user, changed]);

  const handleClick = (event) => {
    dispatch(handleRightBar(true));
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <CreateCarreraModal dialogCarrera={dialogCarrera} user={user} currentProceso={currentProceso} setChanged={setChanged} />
      {/*
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" gutterBottom>
            Horarios DIINF
          </Typography>
        </Grid>
        <Grid item xs={2}>
            currentProceso.id > -1 &&
            <>
              <Tooltip title="Opciones del Proceso">
                <Fab color="primary" size="small" aria-label="add" style={{backgroundColor: '#EA7600'}} onClick={handleClick}>
                  <MoreVertIcon />
                </Fab>
              </Tooltip>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <SelectProceso procesos={procesos} date={date} setDate={setDate}
                  currentProceso={currentProceso}
                />
              </Popover>
            </>
        </Grid>
      </Grid>
      */}
      {
        currentProceso.id > -1 ?
        <div style={{marginTop: 50}}>
          <TablaCarreras carreras={carreras} />
        </div>
        :
        <div style={{margin: 50}}>
          
        </div>
      }
    </div>
  )
}

export default VistaPrincipal;
