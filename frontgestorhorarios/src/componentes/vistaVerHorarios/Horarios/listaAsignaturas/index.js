import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { useDrop } from 'react-dnd'

import ItemTypes from '../../itemTypes/ItemTypes'
import AsignaturaItem from './asignaturaItem'

const useStyles = makeStyles(theme => ({
  lista:{
    width: '90%',
    maxWidth: 330,
    backgroundColor: theme.palette.background.paper,
    minHeight: 500,
  },
}));


function ListaAsignaturas({asignaturas, data, dropLista, userRedux, handleMostrarCoordinacion, }) {

  const classes = useStyles();

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: dropLista,
  })

  drop(ref);

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
          var coordsAsignatura = data.filter(dato=>dato.asignaturaId===asignatura.asignaturaId)
          return (
            <AsignaturaItem asignatura={asignatura.nombre_asignatura} data={coordsAsignatura}
              key={asignatura.cod_asignatura} userRedux={userRedux}
              handleMostrarCoordinacion={handleMostrarCoordinacion}/>
          )
        })
      }
    </List>
  );
}
export default ListaAsignaturas
