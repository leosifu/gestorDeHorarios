import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function EditDatos(){

  const classes = useStyles();

  return(
    <Box className={classes.sector} borderRadius={1} boxShadow={2}>
      <Typography variant="h4" component="h3" className={classes.campoDes}>
        Paradigmas
      </Typography>
      <Typography className={classes.campoDes}>
        Código de la asignatura: 1234
      </Typography>
      <Typography className={classes.campoDes}>
        Descripción de la Asignatura:
      </Typography>
      <Box borderRadius={1} className={classes.descripcion}>
        Aca va la descripcion
      </Box>
      <Typography className={classes.campoDes}>
        <Grid container>
          <Grid item xs={3}>
            TEL:
          </Grid>
          <Grid item xs={3}>
            Teoría: 3
          </Grid>
          <Grid item xs={3}>
            Ejercicios: 0
          </Grid>
          <Grid item xs={3}>
            Laboratorio: 1
          </Grid>
        </Grid>
      </Typography>
      <Typography className={classes.campoDes}>
        Prerrequisitos: Métodos de Programación
      </Typography>
    </Box>
  )
}

export default EditDatos
