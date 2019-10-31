import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Carrera from './carrera'
import CrearCarrera from '../formularios/formCarrera/crearCarrera'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
}));

export default function ListadoCarreras(){
  const classes = useStyles();

  const [openC, setOpenC] = useState(false);

  const [estado, setEstado] = useState(false);

  const [carrerasD, setCarrerasD] = useState([])

  const [carrerasV, setCarrerasV] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/api/carrera')
    .then(res => {
      var vesp = []
      var diur = []
      const data = res.data
      for (var i = 0; i < data.length; i++) {
        if (data[i].jornada === "Vespertino") {
          vesp.push(data[i])
        }
        else{
          diur.push(data[i])
        }
      }
      setCarrerasV(vesp)
      setCarrerasD(diur)
    })
  }, [openC, estado])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={11}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={1}>
          <CrearCarrera open={openC} setOpen={setOpenC}/>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container>
        <Grid item xs={11}>
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
    </div>
  );
}
