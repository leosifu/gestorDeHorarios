import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useDrop } from 'react-dnd'

import ItemTypes from '../itemTypes/ItemTypes'
import Bloque from './bloque'
import AsignaturaItem from './asignaturaItem'

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


function ListaAsignaturas({asignaturas, data, dropLista}) {

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: dropLista,
  })

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  drop(ref)

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Asignaturas
        </ListSubheader>
      }
      className={classes.lista}
      ref={ref}
    >
      {
        asignaturas.map(asignatura=>{
          var coordsAsignatura = data.filter(dato=>dato.cod_asignatura==asignatura.cod_asignatura)
          return (<AsignaturaItem asignatura={asignatura.nombre_asignatura} data={coordsAsignatura}/>)
        })
      }
    </List>
  );
}
export default ListaAsignaturas
