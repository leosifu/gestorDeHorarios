import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Typography, IconButton, } from '@material-ui/core';

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

const HistorialAsignatura = ({asignatura, }) => {

  const classes = useStyles();

  return (
    <Box className={classes.sector} borderRadius={1} boxShadow={2}>
      <Typography variant="h4" component="h3" className={classes.campoDes}>
        Historial
      </Typography>
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
    </Box>
  )
}

export default HistorialAsignatura;
