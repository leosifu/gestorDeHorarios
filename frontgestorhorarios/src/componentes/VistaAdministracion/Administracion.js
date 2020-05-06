import React, {useState, useEffect} from 'react';

import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, TextField, Grid, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {setLoading, handleDialogCreate, } from '../../redux/actions'

import VerUsuarios from './VerUsuarios';
import AdministrarUsuario from './AdministrarUsuario';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px 50px 50px 50px'
  },
}));

const Administracion = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [profesores, setProfesores] = useState([]);
  const [coordinadores, setCoordinadores] = useState([]);
  const [noRole, setNoRole] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    clientAxios().get(`/api/usuarios`)
    .then(res => {
      console.log(res.data);
      setProfesores(res.data.profesores)
      setCoordinadores(res.data.coordinadores)
      setNoRole(res.data.noRole)
    })
    .catch(error => {
      console.log(error);
    })
    dispatch(setLoading(false));
  }, [changed]);

  const handleOpen = () => {
    dispatch(handleDialogCreate(true))
  }

  return (
    <div className={classes.root}>
      <h2>
        Administracion de Usuarios
      </h2>
      <AdministrarUsuario changed={changed} setChanged={setChanged}/>
      <Button onClick={handleOpen}>
        Agregar Nuevo Usuario
      </Button>
      <Grid container>
        <Grid item xs={4}>
          <VerUsuarios title={'Coordinadores'} usuarios={coordinadores}/>
        </Grid>
        <Grid item xs={4}>
          <VerUsuarios title={'Profesores'} usuarios={profesores}/>
        </Grid>
        <Grid item xs={4}>
          <VerUsuarios title={'Sin Rol'} usuarios={noRole}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Administracion;
