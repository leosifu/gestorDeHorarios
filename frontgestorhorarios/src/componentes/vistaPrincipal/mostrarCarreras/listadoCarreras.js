import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

import Carrera from './carrera'

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
    axios.get('http://localhost:8000/api/carrera/1')
    .then(res => {
      console.log(res.data);
    })
    setCarrerasD(Carreras[0].Diurnas)
    setCarrerasV(Carreras[1].Vespertinas)
  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={11}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={1}>
          <Fab color="primary" size="small" aria-label="add" className={classes.margin}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}>
            <Carrera title={carrera.NombreC} mallas={carrera.Mallas}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container>
        <Grid item xs={11}>
          <h2>Carreras Vespertinas</h2>
        </Grid>
        <Grid item xs={1}>
          <Fab color="primary" size="small" aria-label="add" className={classes.margin}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasV.map((carrera)=>(
          <Grid item xs={6}>
            <Carrera title={carrera.NombreC} mallas={carrera.Mallas}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
