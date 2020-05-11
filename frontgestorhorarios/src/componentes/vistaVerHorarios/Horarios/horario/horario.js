import React, { useState, useCallback, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableCell, TableHead, TableRow, Paper, Grid, } from '@material-ui/core';

import update from 'immutability-helper'

import clientAxios from '../../../../config/axios';

import ListaAsignaturas from '../listaAsignaturas';
import TablaHorarios from '../tablaHorarios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  encabezado:{
    maxWidth:100,
    minWidth: 100
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

function Horario({data, setData, asignaturas, setAsignaturas, user}) {

  const classes = useStyles();

  const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  const [bloques, setBloques] = useState([]);

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
      let nuevoBloque = x*6 + y;
      const dato = data.find(dato=>dato.id===item.id)
      const datoBloque = {
        num_bloque: nuevoBloque,
        asignado: true
      }
      clientAxios(user.idToken).post(`/api/bloque/${item.id}`, datoBloque)
      .then(res => {
        console.log(res.data);
      })
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
    const dato = data.find(dato=>dato.id===item.id)
    const index = data.indexOf(dato)
    const datoBloque = {
      num_bloque: -1,
      asignado: false
    }
    clientAxios(user.idToken).post(`/api/bloque/${item.id}`, datoBloque)
    .then(res => {
      console.log(res.data);
    })
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

export default Horario
