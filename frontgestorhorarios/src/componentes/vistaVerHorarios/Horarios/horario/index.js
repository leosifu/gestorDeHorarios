import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import update from 'immutability-helper'

import { connect } from 'react-redux';

import ListaAsignaturas from '../listaAsignaturas'
import TablaHorarios from '../tablaHorarios'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
  },
  grilla:{
    width: 110,
    height: 50,
    padding: '0 0 0 0'
  },
  hora:{
    width: 110,
    height: 50,
    padding: '0 0 0 10px',
  },
  encabezado:{
    maxWidth:100,
    minWidth: 100
  },
  lista:{
    width: '90%',
    maxWidth: 330,
    backgroundColor: theme.palette.background.paper,
    minHeight: 500,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const colores = ['#F012BE', '	#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#FFDC00', '#FF851B', '#FF4136']

function Horario(props) {
  const classes = useStyles();

  const {mallaId, nivel} = props

  const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const [data, setData] = useState([])

  const [bloques, setBloques] = useState([])

  const [asignaturas, setAsignaturas] = useState([])

  useEffect(()=>{
    var link = 'http://localhost:8000/api/asignatura/' + mallaId.mallaId + '/' + nivel
    console.log(link);
    axios.get(link)
    .then(res => {
      const data = res.data
      var asignaturas = data.map(asignatura=>({nombre_asignatura: asignatura.nombre_asignatura,cod_asignatura: asignatura.cod_asignatura}))
      console.log(res.data);
      setAsignaturas(asignaturas)
      var bloquesMatrix = data.map((asignatura, i)=>asignatura.coordinaciones.map(coordinacion=>{
        coordinacion.bloques.map(bloque=>{
          bloque.cod_asignatura = asignatura.cod_asignatura
          bloque.nombre_coord = coordinacion.nombre_coord
          bloque.cod_coord = coordinacion.cod_coord
          bloque.mostrar = true
          bloque.size = 1
          bloque.color = colores[i]
          return bloque
        })
        return coordinacion.bloques
      }))
      var bloques = []
      bloquesMatrix.map(bloqueM=>bloques = bloques.concat(...bloqueM))
      setData(bloques)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[nivel, mallaId.mallaId])

  useEffect(()=>{
    var matrix = []
    for ( var y = 0; y < 9; y++ ) {
      matrix[ y ] = [];
      for ( var x = 0; x < 6; x++ ) {
        matrix[ y ][ x ] = [];
      }
    }
    var ancho = matrix[0].length
    for (var i = 0; i < data.length; i++) {
      if(data[i].asignado){
        let x = data[i].num_bloque % ancho
        let y = parseInt(data[i].num_bloque /ancho)
        /*matrix[y][x] = data[i]
        */
        var pos = []
        if(matrix[y][x].length>0){
          pos = matrix[y][x].map(dato=>dato)
        }
        pos.push(data[i])
        matrix[y][x] = pos
      }
    }
    setBloques(matrix)
  },[data])

  const handleDrop = useCallback(
    (x, y, item) => {
      console.log(x);
      console.log(y);
      console.log(item);
      let nuevoBloque = x*6 + y;
      const dato = data.find(dato=>dato.id===item.id)
      const index = data.indexOf(dato)
      var prevPos = dato.num_bloque
      if (nuevoBloque === prevPos) {
        return
      }
      const repetidos = data.filter(dato=>dato.num_bloque===nuevoBloque)
      repetidos.push(dato)
      var matrixAux = data.slice()
      if (repetidos.length===1) {
        if(!matrixAux[index].asignado){
          matrixAux[index].asignado = true
        }
        matrixAux[index].num_bloque = nuevoBloque
        matrixAux[index].size = 1
      }
      else {
        if(!matrixAux[index].asignado){
          matrixAux[index].asignado = true
        }
        matrixAux[index].num_bloque = nuevoBloque
        repetidos.map((rep, i)=>{
          var index2 = data.indexOf(rep)
          matrixAux[index2].size = repetidos.length
          return true
        })
      }
      var posAnt = data.filter(dato=>dato.num_bloque===prevPos)
      posAnt.map((rep, i)=>{
        var index2 = data.indexOf(rep)
        matrixAux[index2].size = repetidos.length-1
        return true
      })
      setData(matrixAux)
    }, [data]
  )

  const dropLista = useCallback((item) => {
    console.log("asdad");
    const dato = data.find(dato=>dato.id===item.id)
    const index = data.indexOf(dato)
    setData(
      update(data,{
        [index]:{
          asignado:{
            $set: false
          },
          num_bloque:{
            $set: -1
          }
        }
      })
    )}, [data])

  return (
    <Grid container>
      <Grid item xs={2}>
        <ListaAsignaturas asignaturas={asignaturas} data={data} dropLista={dropLista}/>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {dias.map((dia)=>(
                  <TableCell className={classes.encabezado} key={dia}>{dia}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TablaHorarios bloques={bloques} handleDrop={handleDrop} />
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    mallaId: state.mallaId
  }
}

export default connect(mapStateToProps)(Horario)
