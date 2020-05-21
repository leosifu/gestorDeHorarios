import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Bloque from '../horario/bloque'

const useStyles = makeStyles(theme => ({
  grilla:{
    width: 200,
    height: 90,
    padding: '0 0 0 0'
  },
  hora:{
    width: 110,
    height: 50,
    padding: '0 0 0 10px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const horarios = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:50', '13:50 - 15:20',
'15:30 - 17:00', '17:10 - 18:40', '19:00 - 20:10', '20:20 - 22:00', '22:00 - 23:00']

function TablaHorarios({bloques, handleDrop, userRedux, dontDrag, }){

  const classes = useStyles();

  const Tabla = bloques.map((fila, i) => {
    const Dia = fila.map((dia, j) => {
      if (dia.length>0) {
        const Bloques = dia.map(bloque=>{
          return(
            <Bloque coord={bloque} onDrop={item => handleDrop(i, j, item)} tipo={"tabla"}
              key={bloque.id} userRedux={userRedux} dontDrag={dontDrag}/>
          )
        })
        return(
          <TableCell padding="none" className={classes.grilla} key={j}>
            <div style={{width:'100%', display: 'flex'}}>
              {Bloques}
            </div>
          </TableCell>
        )
      }
      else {
        const NoCoord = {
          nombre_coord: '',
          cod_coord: '',
          bloque: 0,
          id:0,
          color: 'white',
          profesores: []
        }
        return(
          <TableCell padding="none" className={classes.grilla} key={j}>
            <Bloque onDrop={item => handleDrop(i, j, item)} style={{left: 50}} coord={NoCoord}
              userRedux={userRedux}/>
          </TableCell>
        )
      }
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
export default TablaHorarios
