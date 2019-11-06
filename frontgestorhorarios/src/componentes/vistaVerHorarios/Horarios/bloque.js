import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

export default function Bloque({nombre_coord, cod_coord, bloque, id, onDrop, color, tipo}) {
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
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  drop(drag(ref))

  return (
    <Card ref={ref} className={classes.card} style={{ backgroundColor }} padding="none">
      <CardContent className={classes.contenido}>
        <Grid container>
          <Grid item xs={11}>
            <Typography >
              {nombre_coord}
              {cod_coord}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
