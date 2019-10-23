import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../itemTypes/ItemTypes'

const useStyles = makeStyles({
  card: {
    width: 110,
    height: 50,
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

export default function Bloque({title, bloque, id, onDrop, color}) {
  const ref = useRef(null)
  const classes = useStyles();
  const [ , drag] = useDrag({
    item: { id, title, bloque, type: ItemTypes.BOX },
    canDrag: title ? true : false,
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
  backgroundColor = color
  drop(drag(ref))

  return (
    <Card  ref={ref} className={classes.card} style={{ backgroundColor }} padding="none">
      <CardContent className={classes.contenido}>

        <Typography >
          {title}
          {id}
        </Typography>

      </CardContent>
    </Card>
  );
}
