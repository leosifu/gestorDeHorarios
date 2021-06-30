import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Typography, IconButton, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import EditAsignatura from '../asignaturaForm/editAsignatura'

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

export default function InfoAsignatura({infoAsignatura, asignatura, estado, setEstado, user,
  userRedux, estadoM, setEstadoM, carreraId, }){

  const classes = useStyles();

  const [edit, setEdit] = useState(false)

  function clickEdit(){
    setEdit(true)
  }

  return(
    <>
      {
        edit?
          <>
            {
              userRedux.status === 'login' &&
              (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
              <EditAsignatura infoAsignatura={infoAsignatura} user={user}
                asignatura={asignatura} setEdit={setEdit} estado={estado} setEstado={setEstado}
                estadoM={estadoM} setEstadoM={setEstadoM} carreraId={carreraId}
              />
            }
          </>
          :
          <>
          <Box className={classes.sector} borderRadius={1} boxShadow={2}>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h4" component="h3" className={classes.campoDes}>
                  {infoAsignatura.nombre_asignatura}
                </Typography>
              </Grid>
              {
                userRedux.status === 'login' &&
                (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
                <Grid item xs={1}>
                  <IconButton className={classes.centrarIcon} onClick={clickEdit}>
                    <EditIcon style={{color:"blue"}}/>
                  </IconButton>
                </Grid>
              }
            </Grid>
            <div className={classes.dates}>
              <Typography className={classes.miniTitle}>
                {`Código de la asignatura:`}
              </Typography>
              <Typography >
                {`${infoAsignatura.cod_asignatura}`}
              </Typography>
            </div>

            <Grid container>
              <Grid item xs={3}>
                <div className={classes.dates}>
                  <Typography className={classes.miniTitle}>
                    {`TEL:`}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Teoría: {asignatura.tel_T}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Ejercicios: {asignatura.tel_E}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Laboratorio: {asignatura.tel_L}
                </Typography>
              </Grid>
            </Grid>

            <div className={classes.dates}>
              <Typography className={classes.miniTitle}>
                {`Prerrequisitos:`}
              </Typography>
            </div>
            {
              asignatura?.requisitos?.map(requisito=>
                  <Typography className={classes.campoDes}>{requisito.nombre_asignatura}</Typography>
              )
            }
          </Box>
          {/*
            userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <Box className={classes.sector} borderRadius={1} boxShadow={2}>
              <Typography variant="h4" component="h3" className={classes.campoDes}>
                Historial
              </Typography>
              <Typography className={classes.campoDes}>
                Cupos cupos estimados: {asignatura?.historial?.cupos_estimados}
              </Typography>
              <Typography className={classes.campoDes}>
                Cupos del semestre pasado: {asignatura?.historial?.cupos_pasados}
              </Typography>
              <Typography className={classes.campoDes}>
                Tasa de reprobación:{asignatura?.historial?.tasa_reprobacion + '%'}
              </Typography>
              <Typography className={classes.campoDes}>
                Desinscripciones actuales: {asignatura?.historial?.desinscripciones}
              </Typography>
            </Box>
          */}
          </>
      }
    </>
  )
}
