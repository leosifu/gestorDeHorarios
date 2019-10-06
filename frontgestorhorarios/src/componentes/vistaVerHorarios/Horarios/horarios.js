import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Bloque from './bloque'
import update from 'immutability-helper'

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
  }
}));

const horarios = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:50', '13:50 - 15:20', '15:30 - 17:00', '17:10 - 18:40', '19:00 - 20:10', '20:20 - 22:00', '22:00 - 23:00']



export default function Horario() {
  const classes = useStyles();

  const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const [data, setData] = useState([])

  const [bloques, setBloques] = useState([])

  useEffect(() =>{
    const obtenerData = () =>{
      console.log("asd");
      setData([{id: 0, title: 'Algo', bloque:1}, {id: 1, title: 'nada', bloque: 5}, {id: 2, title: 'Algo', bloque: 7}, {id:3, title: 'nada', bloque: 14}, {id:4, title: 'Algo', bloque: 22}, {id:5, title: 'nada', bloque: 24},
      {id:6, title: 'Algo', bloque:30}, {id:7, title: 'nada', bloque:40}, {id:8, title: 'Algo', bloque: 50}])
      console.log(data);
    }
    obtenerData()
  }, []);

  useEffect(()=>{

  })

  const handleDrop = useCallback(
    (x, y, item) => {
      let miBloque = x*6 + y;
      setData(
        update(data,{
          [item.id]:{
            bloque:{
              $set: miBloque
            }
          }
        })
      )
    }, [data]
  )

  const GenerarHorario = () => {
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
    console.log(data);
    const Tabla = matrix.map((fila, i)=>{
      const Dia = fila.map((dia, j)=>{
        return(
        <TableCell padding="none" className={classes.grilla}  >
          <Bloque title={dia.title} bloque={dia.bloque} id={dia.id} onDrop={item => handleDrop(i, j, item)}/>
        </TableCell>
      )
      })
      return (
        <TableRow key={i}>
          <TableCell className={classes.hora} component="th" scope="row" >
            {horarios[i]}
          </TableCell>
          {Dia}
        </TableRow>
      )
    })

    return(
      <TableBody>{Tabla}</TableBody>
    )
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {dias.map((dia)=>(
              <TableCell className={classes.encabezado}>{dia}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/*<TableBody>
          bloques.map((fila, i)=>{
            const Dia = fila.map((dia, j)=>{
              return(
              <TableCell padding="none" className={classes.grilla}  >
                <Bloque title={dia.title} bloque={dia.bloque} onDrop={item => handleDrop(i, j, item)}/>
              </TableCell>
            )
            })
            return (
              <TableRow key={i}>
                <TableCell className={classes.hora} component="th" scope="row" >
                  {horarios[i]}
                </TableCell>
                {Dia}
              </TableRow>
            )
          })
          <GenerarHorario data={data} classes={classes} handleDrop={handleDrop} />
        </TableBody>*/}
        <GenerarHorario data={data} handleDrop={handleDrop} />
      </Table>
    </Paper>
  );
}
