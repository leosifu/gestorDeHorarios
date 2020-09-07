import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '../../../../utils/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
}));

function HistorialForm({handleOnChange, cupos_pasados, tasa_reprobacion, desinscripciones, }){

  const classes = useStyles();
  
  return(
    <>
      <Typography variant="h6" component="h3" className={classes.campoDes}>
        Historial
      </Typography>
      <TextField
        error={cupos_pasados.error ? true:false}
        id="standard-required"
        label="Cupos del semestre pasado"
        name="cupos_pasados"
        type="number"
        style={{width: '45%'}}
        value={cupos_pasados.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        error={tasa_reprobacion.error ? true:false}
        id="standard-required"
        label="Tasa de reprobación de la asignatura"
        name="tasa_reprobacion"
        type="number"
        style={{width: '45%'}}
        value={tasa_reprobacion.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        error={desinscripciones.error ? true:false}
        id="standard-required"
        label="Desinscripciones de la asignatura"
        name="desinscripciones"
        type="number"
        style={{width: '45%'}}
        value={desinscripciones.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
    </>
  )
}
export default HistorialForm
