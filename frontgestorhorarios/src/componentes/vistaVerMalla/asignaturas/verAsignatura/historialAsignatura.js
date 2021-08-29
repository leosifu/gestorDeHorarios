import React, {useState, } from 'react';

import clientAxios from '../../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Typography, IconButton, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import EditHistorial from '../asignaturaForm/editHistorial/editHistorial';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
  },
  campoDes:{
    marginBottom: 10,
    padding: 10,
  },
  descripcion:{
    margin: 10,
    padding: 10,
    height: '4rem',
  },
  titulo:{
    margin: 10,
    padding: 10,
  },
  miniTitle: {
    fontWeight: 'bold',
    marginRight: 5
  },
  dates: {
    display: 'flex',
    marginBottom: 10,
    padding: 10,
  },
}));

const HistorialAsignatura = ({asignatura, userRedux, user, estadoM, setEstadoM, estado, setEstado, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  function clickEdit(){
    setEdit(true)
  };

  const cancelAction = () => setEdit(false);

  function onSubmitForm(state) {
    dispatch(setLoading(true));
    const historial = {
      cupos_pasados: state.cupos_pasados.value || 0,
      tasa_reprobacion: state.tasa_reprobacion.value || 0,
      desinscripciones: state.desinscripciones.value || 0
    }
    clientAxios(user.idToken).put(`/api/historial/${asignatura.id}`, historial)
    .then(res => {
      setEdit(false)
      setEstadoM(!estadoM);
      setEstado(!estado);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'success',
        message: 'Asignatura actualizada'}
      ));
    })
    .catch(error => {
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al actualizar la asignatura'}
      ));
    })
  }

  return (
    <Box className={classes.sector} borderRadius={1} boxShadow={2}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h4" component="h3" className={classes.campoDes}>
            Historial {asignatura.nombre_asignatura}
          </Typography>
        </Grid>
        {
          userRedux.status === 'login' &&
          (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
          <>
            {
              edit ||
              <Grid item xs={1}>
                <IconButton className={classes.centrarIcon} onClick={clickEdit}>
                  <EditIcon style={{color:"blue"}}/>
                </IconButton>
              </Grid>
            }
          </>
        }
      </Grid>
      {
        edit ?
        <EditHistorial historialAsignatura={asignatura.historial} onSubmitForm={onSubmitForm}
          cancelAction={cancelAction}
        />
        :
        <>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Cupos cupos estimados:`}
            </Typography>
            <Typography >
              {`${asignatura?.historial?.cupos_estimados}`}
            </Typography>
          </div>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Cupos del semestre pasado:`}
            </Typography>
            <Typography >
              {`${asignatura?.historial?.cupos_pasados}`}
            </Typography>
          </div>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Tasa de reprobación:`}
            </Typography>
            <Typography >
              {`${asignatura?.historial?.tasa_reprobacion + '%'}`}
            </Typography>
          </div>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Desinscripciones actuales:`}
            </Typography>
            <Typography >
              {`${asignatura?.historial?.desinscripciones}`}
            </Typography>
          </div>
        </>
      }
    </Box>
  )
}

export default HistorialAsignatura;
