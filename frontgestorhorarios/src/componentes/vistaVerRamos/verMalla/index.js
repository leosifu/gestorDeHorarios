import React, {useState,useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Ramo from './ramo'

const useStyles = makeStyles({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    position:'static',

    overflowY: 'scroll',


  },
});

/*const niveles = [
  {Nivel: '1', asignaturas: [{nombre_asignatura:'Uno', cod_asignatura: 123}, {nombre_asignatura:'Dos', cod_asignatura: 345},
    {nombre_asignatura:'asda', cod_asignatura: 1223}, {nombre_asignatura:'Unas', cod_asignatura: 1203}, {nombre_asignatura:'Uno', cod_asignatura: 123}]},
  {Nivel: '2', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '3', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '4', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '5', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '6', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '7', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '8', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '9', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '10', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '11', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]},
  {Nivel: '12', asignaturas:[{nombre_asignatura:'Uno', cod_asignatura: 124}, {nombre_asignatura:'Tres', cod_asignatura: 123},{nombre_asignatura:'Uno', cod_asignatura: 123},
    {nombre_asignatura:'qeq', cod_asignatura: 345}]}
];*/


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
  },[estado])

  return (
    <Paper className={classes.root}>
        <GridList className={classes.gridList} cols={8}>
          {niveles ? niveles.map(nivel => {
            console.log(nivel);
            return(<div style={{height:590}}>
              <GridListTile style={{ height: 'auto', overflow:'auto' }}>
                <Ramo nivel={nivel.nivel} asignaturas={nivel.asignaturas}/>
              </GridListTile>
            </div>
          )}) : < div/>}
        </GridList>
    </Paper>
  );
}
