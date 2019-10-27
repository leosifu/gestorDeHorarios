import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Bloque from './bloque'

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

const horarios = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:50', '13:50 - 15:20',
'15:30 - 17:00', '17:10 - 18:40', '19:00 - 20:10', '20:20 - 22:00', '22:00 - 23:00']

export default function TablaHorarios({bloques, handleDrop}){

  const classes = useStyles();

  console.log(bloques);
  const Tabla = bloques.map((fila, i)=>{
    const Dia = fila.map((dia, j)=>{

      return(
        <TableCell padding="none" className={classes.grilla} >
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
