import React, { useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Bloque from '../horario/bloque'
import BloqueListaAsign from './bloqueListaAsign'

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
    paddingLeft: theme.spacing(3),
  },
}));

function AsignaturaItem({asignatura, data}){

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  var codCoords = [...new Set(data.map(dato=>dato.cod_coord))]

  var coords = codCoords.map(cod=>data.filter(dato=>(dato.cod_coord===cod)))

  return(
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={asignatura} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            coords.map(coord=>{
              var coordBloques = coord.filter(coord=>!coord.asignado)
              if(coordBloques.length>0){
                return(
                  <ListItem button className={classes.nested} key={coord[0].id}>
                    <Bloque coord={coordBloques[0]} tipo={"lista"}
                      num={coordBloques.length}/>
                  </ListItem>
                )
              }
              else {
                return(
                  <ListItem button className={classes.nested} key={coord[0].id}>
                    <BloqueListaAsign nombre_coord={coord[0].nombre_coord} cod_coord={coord[0].cod_coord}
                    num={0} color={coord[0].color}/>
                  </ListItem>
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
