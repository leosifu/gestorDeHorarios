import React, {useState, useRef} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import {Select, InputLabel, MenuItem, FormControl, FormControlLabel, Radio,
  RadioGroup, TextField, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  campoDes:{
    marginBottom: 5,
    padding: 10,
  },
}));

const EspecCoordForm = ({handleOnChange, tipo_coord, num_bloques, }) => {

  const classes = useStyles();

  const inputLabel = useRef(null);

  const [age, setAge] = useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return(
    <>
      <RadioGroup aria-label="Tipo de coordinación" name="tipo_coord"
        value={tipo_coord.value} onChange={handleOnChange} style={{marginLeft:10}}>
        <FormControlLabel value="Teoría" control={<Radio />} label="Teoría" />
        <FormControlLabel value="Ejercicios" control={<Radio />} label="Ejercicios" />
        <FormControlLabel value="Laboratorio" control={<Radio />} label="Laboratorio" />
      </RadioGroup>
      <TextField
        error = {num_bloques.error ? true : false}
        id="num_bloques"
        label="Bloques asignados a la coordinación"
        name="num_bloques"
        className={classes.textField}
        value={num_bloques.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
    </>
  )
}
export default EspecCoordForm
