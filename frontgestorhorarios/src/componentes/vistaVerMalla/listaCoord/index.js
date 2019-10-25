import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

function ListaCoord(){
  const classes = useStyles();

  return(
    <>
      <Typography variant="h4" component="h3" className={classes.titulo}>
        Coordinaciones
      </Typography>
      <Box className={classes.sector} borderRadius={1} boxShadow={2}>

        <Typography className={classes.campoDes}>
          Código de la coordinación: A-1
        </Typography>
        <Typography className={classes.campoDes}>
          Tipo: Teoría
        </Typography>
        <Typography className={classes.campoDes}>
          Profesor Asignado: Roberto Gonzalez
        </Typography>
      </Box>
      <Box className={classes.sector} borderRadius={1} boxShadow={2}>

        <Typography className={classes.campoDes}>
          Código de la coordinación: B-2
        </Typography>
        <Typography className={classes.campoDes}>
          Tipo: Teoría
        </Typography>
        <Typography className={classes.campoDes}>
          Profesor Asignado: Juan Perez
        </Typography>
      </Box>
    </>
  )
}
export default ListaCoord
