import React, {useState,useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Asignatura from './asignatura'
import NotificacionForm from '../notificacionForm'

const useStyles = makeStyles({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    position:'static',

    overflowY: 'scroll',


  },
});


export default function VerMalla(props) {

  const classes = useStyles();

  const [estado, setEstado] = useState(false);

  const [niveles, setNiveles] = useState([])

  useEffect(()=>{
    var link = 'http://localhost:8000/api/malla/' + props.match.params.id
    axios.get(link)
    .then(res => {
      console.log(res.data[0]);
      setNiveles(res.data[0].niveles)
    })
  },[estado, props.match.params.id])

  return (
    <Paper className={classes.root}>
      <GridList className={classes.gridList} cols={8}>
        {niveles ? niveles.map(nivel => {
          console.log(nivel);
          return(
            <div style={{height:590}} key={nivel.nivel}>
              <GridListTile style={{ height: 'auto', overflow:'auto' }}>
                <Asignatura mallaId={props.match.params.id} nivel={nivel.nivel} asignaturas={nivel.asignaturas} estado={estado} setEstado={setEstado}/>
              </GridListTile>
            </div>
        )}) : < div/>}
      </GridList>
      <NotificacionForm />
    </Paper>
  );
}
