import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
  textFieldNumber:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
}));

function AsignarAsignaturaForm({handleOnChange, cod_asignatura, nombre_asignatura}){
  const classes = useStyles();
  return(
    <>
      <Typography variant="h6" component="h3" className={classes.campoDes}>
        Datos de la Asignatura
      </Typography>
      <TextField
        error = {cod_asignatura.error ? true : false}
        id="standard-name"
        label="Código de la asignatura"
        name="cod_asignatura"
        className={classes.textField}
        value={cod_asignatura.value}
        onChange={handleOnChange}
        type="number"
        margin="normal"
        variant="outlined"
      />
      <TextField
        error = {nombre_asignatura.error ? true : false}
        id="standard-name"
        label="Nombre de la asignatura"
        name="nombre_asignatura"
        className={classes.textField}
        value={nombre_asignatura.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
    </>
  )
}
export default AsignarAsignaturaForm
