import React, {useRef, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import useForm from '../../form/useForm'

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

function CrearCoordinacion({camposCord, onSubmitForm}){
  const classes = useStyles();
  const [age, setAge] = useState('');

  const inputLabel = useRef(null);

  const handleChange = event => {
    setAge(event.target.value);
  };

  const stateSchema = {
    cod_coord: { value: camposCord.cod_coord, error: '' },
    nombre_coord: { value: camposCord.nombre_coord, error: '' },
    tipo_coord: { value: camposCord.tipo_coord, error: '' },
  };

  const validationStateSchema = {
    cod_coord: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_coord: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tipo_coord: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return(
    <>
      <Box className={classes.sector} borderRadius={1} boxShadow={2}>
        <Typography variant="h6" component="h3" className={classes.campoDes}>
          Datos de la Asignatura
        </Typography>
        <TextField
          error = {state.cod_coord.error ? true : false}
          id="standard-name"
          label="Código de la coordinación"
          name="cod_coord"
          className={classes.textField}
          value={state.cod_coord.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          error = {state.nombre_coord.error ? true : false}
          id="standard-name"
          label="Nombre de la coordinación"
          name="nombre_coord"
          className={classes.textField}
          value={state.nombre_coord.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />

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
          value={state.tipo_coord.value} onChange={handleOnChange} style={{marginLeft:10}}>
          <FormControlLabel value="Teoría" control={<Radio />} label="Teoría" />
          <FormControlLabel value="Ejercicios" control={<Radio />} label="Ejercicios" />
          <FormControlLabel value="Laboratorio" control={<Radio />} label="Laboratorio" />
        </RadioGroup>
        <DialogActions>
          <Button onClick={handleOnSubmit} disabled={disable} variant="contained" color="primary" className={classes.button}>
            Crear Coordinación
          </Button>
        </DialogActions>
      </Box>
    </>
  )
}
export default CrearCoordinacion
