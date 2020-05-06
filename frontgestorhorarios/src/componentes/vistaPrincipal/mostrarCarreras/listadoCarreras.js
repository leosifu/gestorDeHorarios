import React, {useState, useEffect, useCallback} from 'react'

import axios from 'axios'
import clientAxios from '../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, Fab, } from '@material-ui/core';

import CSVReader from 'react-csv-reader'
import {useDropzone} from 'react-dropzone'
import XLSX from 'xlsx';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, setProcesoActivo, } from '../../../redux/actions'

import Carrera from './carrera'
import CrearCarrera from '../formularios/formCarrera/crearCarrera'
import SelectProceso from '../../VistaNuevoProceso/selectProceso'
import OptionsList from './optionsList'

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

const UserSelector = createSelector(
  state => state.user,
  user => user.user
);

export default function ListadoCarreras(){

  const classes = useStyles();
  const dispatch = useDispatch();

  const procesosData = useSelector(ProcesosSelector);

  const currentProceso = procesosData.currentProceso;
  const procesos = procesosData.procesos;
  const user = useSelector(UserSelector);

  const [openC, setOpenC] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [estado, setEstado] = useState(false);
  const [carrerasD, setCarrerasD] = useState([]);
  const [carrerasV, setCarrerasV] = useState([]);
  const [date, setDate] = useState({});

  useEffect(() => {
    if (currentProceso.id !== -1) {
      clientAxios(user.idToken).get(`/api/carrera?procesoId=${currentProceso.id}`)
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
        setCarrerasV(vesp)
        setCarrerasD(diur)
      })
      dispatch(setLoading(false))
    }
    else {
      if (procesosData.error) {
        console.log('AHHHHHHH');
        setCarrerasV([]);
        setCarrerasD([]);
        dispatch(setLoading(false));
      }
    }
  }, [openC, estado, procesosData, user])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={procesos.length > 0 ? 8 : 9}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={procesos.length > 0 ? 1 : 0}>
          {
            procesos.length > 0 && currentProceso.id !== -1 &&
            <SelectProceso procesos={procesos} date={date} setDate={setDate}
              currentProceso={currentProceso}/>
          }
        </Grid>
        <Grid item xs={procesos.length > 0 ? 2 : 1}>
          <CrearCarrera open={openC} setOpen={setOpenC}/>
        </Grid>
        <Grid item xs={1}>
          <OptionsList />
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h2>Carreras Vespertinas</h2>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasV.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      {/*<input type="file" onChange={e=>handleUpload(e)} />*/}


    </div>
  );
}
