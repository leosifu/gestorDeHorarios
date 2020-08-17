import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from '../../itemTypes/ItemTypes'
import BloqueListaAsign from '../listaAsignaturas/bloqueListaAsign'
import BloqueTablaHorario from '../tablaHorarios/bloqueTablaHorario'

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '100%',
    minWidth: 0
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
  contenido:{
    padding: '3px 3px 3px 3px',
  }
});

export default function Bloque({coord, onDrop, tipo, num, userRedux, dontDrag,
  handleMostrarCoordinacion, }) {
  const {nombre_coord, cod_coord, id, color, num_asociacion, profesores, coordinacionId, mostrar} = coord
  // console.log(coord.coordinacionId);
  const ref = useRef(null)
  const classes = useStyles();
  const [ , drag] = useDrag({
    item: { id, nombre_coord, num_asociacion, type: ItemTypes.BOX },
    canDrag: nombre_coord ? true : false,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      //canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = '	#C0C0C0'
  } else if (canDrop) {
    backgroundColor = '#E8E8E8'
  }
  if (isOver) {
    backgroundColor = '#E8E8E8'
  }

  if (!dontDrag && userRedux.status === 'login') {
    // console.log('wiii');
    if (userRedux.user.roles.includes('admin') || userRedux.user.roles.includes('coordinador')) {
      drop(drag(ref))
    }
  }

  switch (tipo) {
    case "lista":
      return(
        <div ref={ref} className={classes.card}>
          <BloqueListaAsign coord={coord} nombre_coord={nombre_coord} cod_coord={cod_coord} num={num}
            color={color} coordinacionId={coord.coordinacionId} mostrar={mostrar}
            handleMostrarCoordinacion={handleMostrarCoordinacion}/>
        </div>
      )
    case "tabla":
      var width = 100
      if (coord.size) {
        width = 100/coord.size
      }
      width = width + '%'
      return(
        <Card ref={ref} style={{ backgroundColor, minHeight: 45, width }} padding="none">
          <BloqueTablaHorario coord={coord} nombre_coord={nombre_coord} cod_coord={cod_coord}
            profesores={profesores} color={color}/>
        </Card>
      )
    default:
      return(
        <Card ref={ref} className={classes.card} style={{ backgroundColor }} padding="none">
          <CardContent className={classes.contenido} />
        </Card>
      )
  }
}
