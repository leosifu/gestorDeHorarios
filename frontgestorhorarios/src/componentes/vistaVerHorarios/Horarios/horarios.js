import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Bloque from './bloque'
import update from 'immutability-helper'

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
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const horarios = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:50', '13:50 - 15:20', '15:30 - 17:00', '17:10 - 18:40', '19:00 - 20:10', '20:20 - 22:00', '22:00 - 23:00']

const colores = ['#FFA07A', '	#F0E68C', '#00FF00', '#AFEEEE', '#D8BFD8', '#FFD700', '#90EE90']

export default function Horario() {
  const classes = useStyles();

  const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const [data, setData] = useState([])

  const [lista, setlista] = useState([])

  const [bloques, setBloques] = useState([])

  useEffect(() =>{

    const obtenerData = () =>{
      console.log("asd");
      const Data = [{id: 0, title: 'Algo', bloque:1, asignado:true}, {id: 1, title: 'nada', bloque: 5, asignado:true}, {id: 2, title: 'Algo', bloque: 7, asignado:true}, {id:3, title: 'nada', bloque: 14, asignado:true},
      {id:4, title: 'Algo', bloque: 22, asignado:true}, {id:5, title: 'nada', bloque: 24, asignado:true},
      {id:6, title: 'Algo', bloque:30, asignado:true}, {id:7, title: 'nada', bloque:40, asignado:true}, {id:8, title: 'Algo', bloque: 50, asignado:true}, {id:9, title: 'Otro', bloque:-1, asignado:false}]
      var asignados = []
      var noAsignados = []
      for (var i = 0; i < Data.length; i++) {
        if(Data[i].asignado){
          asignados.push(Data[i])
        }
        else {
          noAsignados.push(Data[i])
        }
      }
      setData(Data)
    }
    obtenerData()
  }, []);

  useEffect(()=>{
    var matrix = []
    for ( var y = 0; y < 9; y++ ) {
      matrix[ y ] = [];
      for ( var x = 0; x < 6; x++ ) {
        matrix[ y ][ x ] = {};
      }
    }
    var ancho = matrix[0].length
    for (var i = 0; i < data.length; i++) {
      let x = data[i].bloque % ancho
      let y = parseInt(data[i].bloque /ancho)
      matrix[y][x] = data[i]
    }
    setBloques(matrix)
  },[data])

  const handleDrop = useCallback(
    (x, y, item) => {
      console.log(x);
      console.log(y);
      console.log(item);
      let nuevoBloque = x*6 + y;
      if(bloques[x][y].title){
        console.log("asdasd");
      }
      if(!data[item.id].asignado){
        data[item.id].asignado = true
      }
      setData(
        update(data,{
          [item.id]:{
            bloque:{
              $set: nuevoBloque
            }
          }
        })
      )
      console.log(bloques);
    }, [data]
  )

  function ListadoSecciones() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
        className={classes.lista}
      >
        <ListItem button>
          <ListItemText primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.map((seccion)=>{
              if(!seccion.asignado){
                return(
                  <ListItem button className={classes.nested}>
                    <Bloque title={seccion.title} bloque={seccion.bloque} id={seccion.id}/>
                  </ListItem>
                )
              }
            })}
          </List>
        </Collapse>
      </List>
    );
  }

  const GenerarHorario = () => {

    console.log(bloques);
    let x = 0
    const Tabla = bloques.map((fila, i)=>{
      const Dia = fila.map((dia, j)=>{
        let backgroundColor = dia.title ? colores[x]: ''
        if(dia.title) x++
        return(
          <TableCell padding="none" className={classes.grilla} >
            <Bloque title={dia.title} bloque={dia.bloque} id={dia.id} color={ backgroundColor } onDrop={item => handleDrop(i, j, item)}/>
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

  return (
    <Grid container>
    <Grid item xs={2}>
      <ListadoSecciones />
    </Grid>
    <Grid item xs={10}>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {dias.map((dia)=>(
              <TableCell className={classes.encabezado}>{dia}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <GenerarHorario data={data} handleDrop={handleDrop} />
      </Table>
    </Paper>
    </Grid>
    </Grid>
  );
}
