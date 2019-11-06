import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ItemTypes from '../itemTypes/ItemTypes'
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


function AsignaturaItem({asignatura, data}){

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  var codCoords = [...new Set(data.map(dato=>dato.cod_coord))]

  console.log(codCoords);

  var coords = codCoords.map(cod=>data.filter(dato=>(dato.cod_coord==cod&&!dato.asignado)))

  console.log(coords);

  //console.log(codCoords);

  //separar segun asignados, [asignados][noasig], num no asignados = length [noasign],
  //[no asig [num no asign -1] en bloque]

  return(
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={asignatura} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/*data.map((coordinacion)=>{
            if(!coordinacion.asignado){
              return(
                <ListItem button className={classes.nested}>
                  <Bloque nombre_coord={coordinacion.nombre_coord} bloque={coordinacion.bloque}
                    id={coordinacion.id}/>
                </ListItem>
              )
            }
            else {
              return(<div/>)
            }
          })*/}
          {/*groupByCoor.map(coord=>{
            var bloquesNoAsign = coord.filter(bloque=>!bloque.asignado)
            if(bloquesNoAsign==[]){
              var bloque = bloquesNoAsign[0]
              return(
                <ListItem button className={classes.nested}>
                  <Bloque nombre_coord={bloque.nombre_coord} bloque={bloque.bloque}
                    id={bloque.id}/>
                </ListItem>
              )
            }
          })*/}
          {
            coords.map(coord=>{
              if(coord){
                console.log(coord);
                return(
                  coord.length>0?<ListItem button className={classes.nested}>
                    <Bloque nombre_coord={coord[0].nombre_coord} bloque={coord[0].bloque}
                      id={coord[0].id}/>
                  </ListItem>:<div/>
                )
              }
            })
          }
        </List>
      </Collapse>
    </>
  )
}
export default AsignaturaItem
