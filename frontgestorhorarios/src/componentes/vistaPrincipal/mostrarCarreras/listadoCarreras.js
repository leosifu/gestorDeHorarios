import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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

  const Carreras = [{'Diurnas': [{'NombreC': 'Ing Civil Informatica', 'Mallas': [{'NombreM':'Malla1'}, {'NombreM':'Malla2'}]}, {'NombreC': 'Ingenieria de Ejecución en Computacion e Informatica'}]},{'Vespertinas':[{'NombreC':'Nose'}]}]

  const [carrerasD, setCarrerasD] = useState([])

  const [carrerasV, setCarrerasV] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/api/carrera')
    .then(res => {
      console.log(res.data);
      var vesp = []
      var diur = []
      const data = res.data
      for (var i = 0; i < data.length; i++) {
        if (data[i].jornada == "Vespertino") {
          vesp.push(data[i])
        }
        else{
          diur.push(data[i])
        }
      }
      console.log(vesp);
      setCarrerasD(diur)
      setCarrerasV(vesp)
    })

  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={11}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={1}>
          <CrearCarrera />
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}>
            <Carrera title={carrera.nombre_carrera} carreraId={carrera.id} mallas={carrera.mallas}/>
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
          <Grid item xs={6}>
            <Carrera title={carrera.nombre_carrera} carreraId={carrera.id} mallas={carrera.Mallas}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
