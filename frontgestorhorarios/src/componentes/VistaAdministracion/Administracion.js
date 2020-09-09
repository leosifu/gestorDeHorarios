import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, } from '@material-ui/core';

import PrimaryButton from '../utils/PrimaryButton';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {setLoading, handleDialogCreate, handleNotifications, } from '../../redux/actions'

import VerUsuarios from './VerUsuarios';
import AdministrarUsuario from './AdministrarUsuario';
import SelectProceso from '../VistaNuevoProceso/selectProceso';
import VerHorarioProfesor from './VerHorarioProfesor';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px 50px 50px 50px'
  },
}));

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso
);

const Administracion = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userRedux = useSelector(UserSelector);
  const procesosData = useSelector(ProcesosSelector);

  const currentProceso = procesosData.currentProceso;
  const procesos = procesosData.procesos;
  const {user} = userRedux;

  const [profesores, setProfesores] = useState([]);
  const [coordinadores, setCoordinadores] = useState([]);
  const [noRole, setNoRole] = useState([]);
  const [changed, setChanged] = useState(false);
  const [date, setDate] = useState({});

  useEffect(() => {
    dispatch(setLoading(true));
    if (userRedux.status !== 'login' || !user.roles.includes('admin')) {
      axios.all([
        clientAxios(user.idToken).get(`/api/usuarios`),
        clientAxios(user.idToken).get(`/api/profesores/${currentProceso.id}`)
      ])
      .then(axios.spread((data1, data2)=>{
        const CheckProfe = data1.data.coordinadores.map(usuario => {
          const FindUsuario = data2.data.find(profe => usuario.id === profe.id);
          if (FindUsuario) {
            return usuario
          }
          else {
            return ({...usuario, roles: usuario.roles.filter(rol => rol !== "profe")})
          }
        });
        setCoordinadores(CheckProfe);
        setNoRole(data1.data.noRole);
        setProfesores(data2.data);
      }))
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar los usuarios'}
        ));
      })
    }
    dispatch(setLoading(false));
  }, [changed, currentProceso]);

  if (userRedux.status !== 'login' || !user.roles.includes('admin')) {
    return (
      <Redirect to='/' />
    )
  }

  const handleOpen = () => {
    dispatch(handleDialogCreate(true))
  }

  return (
    <div className={classes.root}>
      <h2>
        Administracion de Usuarios
      </h2>
      <AdministrarUsuario changed={changed} setChanged={setChanged} currentProceso={currentProceso}/>
      <VerHorarioProfesor />
      <Grid container>
        <Grid item xs={8}>
          <PrimaryButton onClick={handleOpen} title='Agregar Nuevo Usuario' />
        </Grid>
        <Grid item xs={4}>
          <SelectProceso procesos={procesos} date={date} setDate={setDate}
            currentProceso={currentProceso}/>
        </Grid>
      </Grid>
      <Grid container
        spacing={0}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={4}>
          <VerUsuarios title={'Coordinadores'} usuarios={coordinadores}/>
        </Grid>
        <Grid item xs={4}>
          <VerUsuarios title={'Profesores'} usuarios={profesores}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Administracion;
