import React, {useState, useRef} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import {Select, InputLabel, MenuItem, FormControl, FormControlLabel, Radio,
  RadioGroup, } from '@material-ui/core';

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

const EspecCoordForm = ({handleOnChange, tipo_coord, }) => {

  const classes = useStyles();

  const inputLabel = useRef(null);

  const [age, setAge] = useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return(
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Profesor
        </InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={30}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <RadioGroup aria-label="Tipo de coordinación" name="tipo_coord"
        value={tipo_coord.value} onChange={handleOnChange} style={{marginLeft:10}}>
        <FormControlLabel value="Teoría" control={<Radio />} label="Teoría" />
        <FormControlLabel value="Ejercicios" control={<Radio />} label="Ejercicios" />
        <FormControlLabel value="Laboratorio" control={<Radio />} label="Laboratorio" />
      </RadioGroup>
    </>
  )
}
export default EspecCoordForm
