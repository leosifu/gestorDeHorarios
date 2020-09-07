import React, {useState, useEffect, useCallback} from 'react'

import axios from 'axios'
import clientAxios from '../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Fab, Typography, } from '@material-ui/core';

import CSVReader from 'react-csv-reader'
import {useDropzone} from 'react-dropzone'
import XLSX from 'xlsx';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, setProcesoActivo, handleNotifications, } from '../../../redux/actions'

import Carrera from './carrera'
import CrearCarrera from '../formularios/formCarrera/crearCarrera'
import SelectProceso from '../../VistaNuevoProceso/selectProceso'
import OptionsList from '../manageProceso/optionsList';
import UpdateProceso from '../manageProceso/UpdateProceso';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
}));

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso
);

const DialogProcesoSelector = createSelector(
  state => state.dialogUpdateProceso,
  dialogUpdateProceso => dialogUpdateProceso
);

const UserSelector = createSelector(
  state => state.user,
  user => user
);

export default function ListadoCarreras(){

  const classes = useStyles();
  const dispatch = useDispatch();

  const userRedux = useSelector(UserSelector);
  const procesosData = useSelector(ProcesosSelector);
  const dialogUpdateProceso = useSelector(DialogProcesoSelector);

  const user = userRedux.user;

  const currentProceso = procesosData.currentProceso;
  const procesos = procesosData.procesos;

  const [openC, setOpenC] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [estado, setEstado] = useState(false);
  const [carrerasD, setCarrerasD] = useState([]);
  const [carrerasV, setCarrerasV] = useState([]);
  const [date, setDate] = useState({});

  useEffect(() => {
    dispatch(setLoading(true));
    if (currentProceso.id !== -1) {
      clientAxios(user.idToken).get(`/api/carrera/${currentProceso.id}`)
      .then(res1 => {
        const carreras = res1.data
        var vesp = []
        var diur = []
        for (var i = 0; i < carreras.length; i++) {
          if (carreras[i].jornada === "Vespertino") {
            vesp.push(carreras[i])
          }
          else{
            diur.push(carreras[i])
          }
        }
        console.log('termino separar');
        setCarrerasV(vesp)
        setCarrerasD(diur)
        dispatch(setLoading(false));
      })
      .catch(error=>{
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar las carreras proceso'}
        ));
      })
    }
    else {
      if (procesosData.error) {
        setCarrerasV([]);
        setCarrerasD([]);
        dispatch(setLoading(false));
      }
    }
  }, [openC, estado, procesosData, user])

  return (
    <div className={classes.root}>
      {
        userRedux.status === 'login' &&
        (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
        <UpdateProceso proceso={currentProceso} dialogUpdateProceso={dialogUpdateProceso}
          estado={estado} setEstado={setEstado} user={user}/>
      }
      <Grid container>
        <Grid item xs={7}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        {
          userRedux.status === 'login' &&
          (user.roles.length > 0) ?
          <Grid item xs={procesos.length > 0 ? 3 : 0}>
            <SelectProceso procesos={procesos} date={date} setDate={setDate}
              currentProceso={currentProceso}/>
          </Grid>
          :
          <Grid item xs={3} style={{textAlign: 'right'}}>
            <Typography>
              {`${currentProceso.semestre}/${currentProceso.año}`}
            </Typography>
          </Grid>
        }
        {
          userRedux.status === 'login' &&
          (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <Grid item xs={1}>
              <CrearCarrera open={openC} setOpen={setOpenC} user={user}/>
            </Grid>
        }
        {
          userRedux.status === 'login' && user.roles.includes('admin') &&
          <Grid item xs={1}>
            <OptionsList currentProceso={currentProceso} user={user}/>
          </Grid>
        }
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado} user={user}
              userRedux={userRedux}/>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h2>Carreras Vespertinas</h2>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasV.map((carrera)=>
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado} user={user}
              userRedux={userRedux}/>
          </Grid>
        )}
      </Grid>
      {/*<input type="file" onChange={e=>handleUpload(e)} />*/}


    </div>
  );
}
