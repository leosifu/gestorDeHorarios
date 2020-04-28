import React, {useState, useEffect} from 'react';

import axios from 'axios';
import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, TextField, Grid, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {setLoading, setProcesoActivo, } from '../../redux/actions'

import SelectProceso from './selectProceso';
import ShowCarrera from './showCarrera';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '100px 100px 100px 100px'
  },
}));

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso.procesos
);

export default function NuevoProceso() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const currentProceso = useSelector(ProcesoSelector);
  const procesos = useSelector(ProcesosSelector);

  const [carrerasV, setCarrerasV] = useState([]);
  const [carrerasD, setCarrerasD] = useState([]);
  const [procesoData, setProcesoData] = useState({
    año: 0,
    semestre: 0
  });
  const [date, setDate] = useState({});
  const [procesoselects, setProcesoselects] = useState(currentProceso);
  const [allSelects, setAllSelects] = useState([]);

  useEffect(() => {
    const procesoFind = procesos.find(proceso => proceso.año === date.age &&
      proceso.semestre === date.semester);
    if (procesoFind) {
      setProcesoselects(procesoFind);
    }
    else {
      setProcesoselects(currentProceso);
    }
  }, [date])

  useEffect(() => {
    if (currentProceso.id !== -1) {
      clientAxios().get(`/api/carrera?procesoId=${procesoselects.id}`)
      .then(res1 => {
        const carreras = res1.data
        let vesp = []
        let diur = []
        let newSelect = [];
        for (var i = 0; i < carreras.length; i++) {
          newSelect.push({
            nombre_carrera: carreras[i].nombre_carrera,
            selects: []
          });
          if (carreras[i].jornada === "Vespertino") {
            vesp.push(carreras[i])
          }
          else{
            diur.push(carreras[i])
          }
        }
        setAllSelects(newSelect);
        setCarrerasV(vesp);
        setCarrerasD(diur);
      })
    }
    dispatch(setLoading(false))
  }, [procesoselects])

  const changeProcesoData = (event) => {
    setProcesoData({...procesoData, [event.target.id]: event.target.value})
  }

  const crearProceso = () => {
    const mallasSelected = [].concat(...allSelects.map(carrera => carrera.selects));
    console.log(mallasSelected);
    const data = {...procesoData};
    data.mallas = mallasSelected
    clientAxios().post('/api/nuevoProceso', data)
    .then(res=>{
      console.log(res.data);
      dispatch(push('/'))
      // setChanged(!changed)
      // setOpen(false)
    })
    .catch((error)=>{
      alert("error al crear la proceso")
    })
  }

  return (
    <div className={classes.root}>
      <h3>
        Nuevo Proceso
      </h3>
      <Grid container>
        <Grid item xs={procesos.length > 0 ? 4 : 6}>
          <TextField
            id="año"
            label="Año"
            variant="outlined"
            value={procesoData.año}
            onChange={changeProcesoData}
          />
        </Grid>
        <Grid item xs={procesos.length > 0 ? 4 : 6}>
          <TextField
            id="semestre"
            label="Semestre"
            variant="outlined"
            value={procesoData.semestre}
            onChange={changeProcesoData}
          />
        </Grid>
        <Grid item xs={procesos.length > 0 ? 4 : 0}>
        {
          procesoselects && procesos.length > 0 &&
          <SelectProceso procesos={procesos} currentProceso={procesoselects} date={date}
            setDate={setDate}/>
        }
        </Grid>
      </Grid>
      <br />
      <Grid container>
        {
          carrerasD.map(carrera => (
            <Grid item xs={3}>
              <ShowCarrera carrera={carrera} allSelects={allSelects} setAllSelects={setAllSelects} />
            </Grid>
          ))
        }
        {
          carrerasV.map(carrera =>
            <Grid item xs={3}>
              <ShowCarrera carrera={carrera} allSelects={allSelects} setAllSelects={setAllSelects} />
            </Grid>
          )
        }
      </Grid>
      <Button onClick={crearProceso}>
        Crear Proceso
      </Button>

    </div>
  );
}
