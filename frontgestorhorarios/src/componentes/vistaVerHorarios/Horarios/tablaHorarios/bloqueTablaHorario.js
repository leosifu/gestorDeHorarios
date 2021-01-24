import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

import { useDispatch } from 'react-redux';
import {handleDialogInfoCoordinacion, } from '../../../../redux/actions';

import './bloqueTablaHorario.css'

const useStyles = makeStyles({
  contenido:{
    height: 90,
    padding: '3px 3px 3px 3px',
    "&:last-child": {
      paddingBottom: 3
    },
    fontSize: 11
  },
  nombreCoord:{
    fontSize: 11,
  },
  icono:{
    margin: 0,
    padding: 0,
    spacing: 0,
    margin: 'auto',
    textAlign: 'center'
  },
  button: {
    width: 20,
    height: 20,
    top: 0,
    left: 0,
    padding: 0
  }
});

function BloqueTablaHorario({coord, nombre_coord, cod_coord, color, profesores, }){

  const classes = useStyles();
  const dispatch = useDispatch();

  const openInfoCoordinacion = () => {
    dispatch(handleDialogInfoCoordinacion(true, coord))
  }

  return(
    <CardContent className={classes.contenido} style={{background: color}}>
      <Grid container>
        <Grid item xs={10}>
          <Typography className={'textoBloque'} style={{fontSize: 11}}>
            {nombre_coord}
          </Typography>
          <Typography className={'textoBloque'} style={{fontSize: 11}}>
            {cod_coord}
          </Typography>
          <Typography className={classes.nombreCoord}>
            Profesores:
          </Typography>
          {
            profesores && profesores.length > 0 && profesores.map(profesor => (
              <Typography className={'textoProfesor'} style={{fontSize: 11}}>
                {`${profesor.name} ${profesor.lastName}`}
              </Typography>
            ))
          }
        </Grid>
        <Grid item xs={2} className={classes.nombreCoord} >
          <IconButton className={classes.button} onClick={openInfoCoordinacion}>
            <InfoTwoToneIcon fontSize="small" className={classes.icono} />
          </IconButton>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BloqueTablaHorario
