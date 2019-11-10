import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from '../itemTypes/ItemTypes'
import BloqueListaAsign from './bloqueListaAsign'
import BloqueTablaHorario from './bloqueTablaHorario'

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '100%',
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

export default function Bloque({coord, onDrop, tipo, num}) {
  const {nombre_coord, cod_coord, bloque, id, color} = coord
  const ref = useRef(null)
  const classes = useStyles();
  const [ , drag] = useDrag({
    item: { id, nombre_coord, bloque, type: ItemTypes.BOX },
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
  drop(drag(ref))


  switch (tipo) {
    case "lista":
      return(
        <div ref={ref} className={classes.card}>
          <BloqueListaAsign nombre_coord={nombre_coord} cod_coord={cod_coord} num={num} color={color}/>
        </div>
      )
    case "tabla":
      var width = 100
      if (coord.size) {
        width = 100/coord.size
      }
      width = width + '%'
      return(
        <Card ref={ref} style={{ backgroundColor, height: '100%', width }} padding="none">
          <BloqueTablaHorario nombre_coord={nombre_coord} cod_coord={cod_coord} color={color}/>
        </Card>
      )
    default:
      return(
        <Card ref={ref} className={classes.card} style={{ backgroundColor }} padding="none">
          <CardContent className={classes.contenido}>
          </CardContent>
        </Card>
      )
  }
}
