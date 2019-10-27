import React, { useState, useCallback, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import update from 'immutability-helper'

import ListaCoordinaciones from './listaCoordinaciones'
import TablaHorarios from './tablaHorarios'

const useStyles = makeStyles(theme => ({
  root: {
    width: 770,
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

//const colores = ['#F012BE', '	#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#FFDC00', '#FF851B', '#FF4136']

export default function Horario() {
  const classes = useStyles();

  const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const [data, setData] = useState([])

  const [bloques, setBloques] = useState([])

  useEffect(() => {

    const obtenerData = () =>{
      const Data = [{id: 0, title: 'Algo', bloque:1, asignado:true}, {id: 1, title: 'nada', bloque: 5, asignado:true}, {id: 2, title: 'Algo', bloque: 7, asignado:true}, {id:3, title: 'nada', bloque: 14, asignado:true},
      {id:4, title: 'Algo', bloque: 22, asignado:true}, {id:5, title: 'nada', bloque: 24, asignado:true},
      {id:6, title: 'Algo', bloque:30, asignado:true}, {id:7, title: 'nada', bloque:40, asignado:true}, {id:8, title: 'Algo', bloque: 50, asignado:true}, {id:9, title: 'Otro', bloque:-1, asignado:false}]
      var asignados = []
      var noAsignados = []
      for (var i = 0; i < Data.length; i++) {
        if(Data[i].asignado){
          asignados.push(Data[i])
        }
        else {
          noAsignados.push(Data[i])
        }
      }
      setData(Data)
    }
    obtenerData()
  }, []);

  useEffect(()=>{
    var matrix = []
    for ( var y = 0; y < 9; y++ ) {
      matrix[ y ] = [];
      for ( var x = 0; x < 6; x++ ) {
        matrix[ y ][ x ] = {};
      }
    }
    var ancho = matrix[0].length
    for (var i = 0; i < data.length; i++) {
      let x = data[i].bloque % ancho
      let y = parseInt(data[i].bloque /ancho)
      matrix[y][x] = data[i]
    }
    setBloques(matrix)
  },[data])

  const handleDrop = useCallback(
    (x, y, item) => {
      console.log(x);
      console.log(y);
      console.log(item);
      let nuevoBloque = x*6 + y;
      if(!data[item.id].asignado){
        data[item.id].asignado = true
      }
      setData(
        update(data,{
          [item.id]:{
            bloque:{
              $set: nuevoBloque
            }
          }
        })
      )
    }, [data]
  )

  const dropLista = useCallback((item) => {
    console.log("asdad");
    setData(
      update(data,{
        [item.id]:{
          asignado:{
            $set: false
          },
          bloque:{
            $set: -1
          }
        }
      })
    )}, [data])

  return (
    <Grid container>
      <Grid item xs={2}>
        <ListaCoordinaciones data={data} dropLista={dropLista}/>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {dias.map((dia)=>(
                  <TableCell className={classes.encabezado}>{dia}</TableCell>
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
