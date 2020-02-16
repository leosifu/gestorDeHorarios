import React from 'react'

import {TextField} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
}));

const DatosCoordForm = ({handleOnChange, cod_coord, nombre_coord, }) => {

  const classes = useStyles();

  return(
    <>
      <TextField
        error = {cod_coord.error ? true : false}
        id="standard-name"
        label="Código de la coordinación"
        name="cod_coord"
        className={classes.textField}
        value={cod_coord.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        error = {nombre_coord.error ? true : false}
        id="standard-name"
        label="Nombre de la coordinación"
        name="nombre_coord"
        className={classes.textField}
        value={nombre_coord.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
    </>
  )
}
export default DatosCoordForm
