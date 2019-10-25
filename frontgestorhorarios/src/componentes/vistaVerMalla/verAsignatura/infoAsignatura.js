import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
  }
}));

export default function InfoAsignatura({asignatura}){

  const classes = useStyles();

  console.log(asignatura);

  return(
    <>
    <Box className={classes.sector} borderRadius={1} boxShadow={2}>
      <Typography variant="h4" component="h3" className={classes.campoDes}>
        {asignatura.nombre_asignatura}
      </Typography>
      <Typography className={classes.campoDes}>
        Código de la asignatura: {asignatura.cod_asignatura}
      </Typography>
      <Typography className={classes.campoDes}>
        Descripción de la Asignatura:
      </Typography>
      <Box borderRadius={1} className={classes.descripcion}>
        Aca va la descripcion
      </Box>

      <Grid container>
        <Grid item xs={3}>
          <Typography className={classes.campoDes}>
            TEL:
          </Typography>
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

      <Typography className={classes.campoDes}>
        Prerrequisitos: Métodos de Programación
      </Typography>
    </Box>

    <Box className={classes.sector} borderRadius={1} boxShadow={2}>
      <Typography variant="h4" component="h3" className={classes.campoDes}>
        Historial
      </Typography>
      <Typography className={classes.campoDes}>
        Cupos del semestre pasado: 50
      </Typography>
      <Typography className={classes.campoDes}>
        Tasa de reprobación: 90%
      </Typography>
      <Typography className={classes.campoDes}>
        Desinscripciones actuales: 10
      </Typography>
    </Box>
    </>
  )
}
