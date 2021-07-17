import React, { useState, useCallback, useEffect } from 'react';

import clientAxios from '../../../../config/axios';

import update from 'immutability-helper'

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableCell, TableHead, TableRow, Paper, Grid, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import HeaderCell from './headerCell'
import ListaAsignaturas from '../listaAsignaturas';
import TablaHorarios from '../tablaHorarios';
import InfoCoordinacion from './InfoCoordinacion';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  encabezado:{
    maxWidth:100,
    minWidth: 100
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '80%'
  },
}));

const getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

const dias = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

function Horario({data, setData, asignaturas, setAsignaturas, user, userRedux, dontDrag, verTope,
  selected, tope, niveles, nivel, setNivel, }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [bloques, setBloques] = useState([]);

  useEffect(()=>{
    var matrix = []
    for ( var y = 0; y < 9; y++ ) {
      matrix[ y ] = [];
      for ( var x = 0; x < 6; x++ ) {
        matrix[ y ][ x ] = [];
      }
    }
    var ancho = matrix[0].length
    for (var i = 0; i < data.length; i++) {
      if(data[i].asignado){
        let x = data[i].num_bloque % ancho
        let y = parseInt(data[i].num_bloque /ancho)
        var pos = []
        if(matrix[y][x].length>0){
          pos = matrix[y][x].map(dato=>dato)
        }
        pos.push(data[i])
        matrix[y][x] = pos
      }
    }
    setBloques(matrix)
  },[data])

  const handleDrop = useCallback(
    (x, y, item) => {
      let nuevoBloque = x*6 + y;
      const dato = data.find(dato=>dato.id===item.id)
      const datoBloque = {
        num_bloque: nuevoBloque,
        asignado: true
      }
      clientAxios(user.idToken).post(`/api/bloque/${item.id}`, datoBloque)
      .then(res => {
        const index = data.indexOf(dato)
        var prevPos = dato.num_bloque
        if (nuevoBloque === prevPos) {
          return
        }
        const repetidos = data.filter(dato=>dato.num_bloque===nuevoBloque)
        repetidos.push(dato)
        var matrixAux = data.slice()
        if (repetidos.length===1) {
          if(!matrixAux[index].asignado){
            matrixAux[index].asignado = true
          }
          matrixAux[index].num_bloque = nuevoBloque
          matrixAux[index].size = 1
        }
        else {
          if(!matrixAux[index].asignado){
            matrixAux[index].asignado = true
          }
          matrixAux[index].num_bloque = nuevoBloque
          repetidos.map((rep, i)=>{
            var index2 = data.indexOf(rep)
            matrixAux[index2].size = repetidos.length
            return true
          })
        }
        var posAnt = data.filter(dato=>dato.num_bloque===prevPos)
        posAnt.map((rep, i)=>{
          var index2 = data.indexOf(rep)
          matrixAux[index2].size = repetidos.length-1
          return true
        })
        setData(matrixAux)
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar el horario'}
        ));
      })
    }, [data]
  )

  const dropLista = useCallback((item) => {
    const dato = data.find(dato=>dato.id===item.id)
    const index = data.indexOf(dato)
    const datoBloque = {
      num_bloque: -1,
      asignado: false
    }
    clientAxios(user.idToken).post(`/api/bloque/${item.id}`, datoBloque)
    .then(res => {
      setData(
        update(data,{
          [index]:{
            asignado:{
              $set: false
            },
            num_bloque:{
              $set: -1
            }
          }
        })
      )
    })
    .catch(error => {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar el horario'}
      ));
    })
  }, [data])

  const handleMostrarCoordinacion = (coordinacionId) => {
    const copyData = data.slice();
    const changeMostrar = copyData.map(bloque => {
      if (bloque.coordinacionId === coordinacionId) {
        return ({
          ...bloque,
          mostrar: !bloque.mostrar
        })
      }
      else {
        return bloque;
      }
    });
    setData(changeMostrar);
  }

  return (
    <>
      <InfoCoordinacion />
      <Grid container>
        {
          !tope &&
          <Grid item xs={2} style={{zIndex: 30}}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Nivel Actual</InputLabel>
              {
                niveles && niveles.length > 0 &&
                <Select
                  native
                  value={nivel}
                  onChange={e => setNivel(e.target.value)}
                  label="Nivel Actual"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {niveles.map((nivelO, index) =>
                    <option value={nivelO.nivel}>{`Ǹivel ${nivelO.nivel}`}</option>
                  )}
                </Select>
              }

            </FormControl>
            <ListaAsignaturas asignaturas={asignaturas} data={data} dropLista={dropLista}
              userRedux={userRedux} handleMostrarCoordinacion={handleMostrarCoordinacion}/>
          </Grid>
        }
        <Grid item xs={verTope ? 8:10} style={{zIndex: 1}}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {
                    dias.map((dia, i) =>
                      <HeaderCell dia={dia} i={i}/>
                    )
                  }
                </TableRow>
              </TableHead>
              <TablaHorarios bloques={bloques} handleDrop={handleDrop} userRedux={userRedux}
                dontDrag={dontDrag}/>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={verTope && 2}>
          {
            selected &&
            <ListaAsignaturas asignaturas={asignaturas} data={data} dropLista={dropLista}
            userRedux={userRedux} handleMostrarCoordinacion={handleMostrarCoordinacion}/>
          }
        </Grid>
      </Grid>
    </>
  );
}

export default Horario
