import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useForm from '../useForm'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CarreraForm = ({cod_carrera, nombre_carrera, jornada, onSubmitForm}) => {
  const stateSchema = {
    cod_carrera: { value: cod_carrera, error: '' },
    nombre_carrera: { value: nombre_carrera, error: '' },
    jornada: { value: jornada ? jornada:"Vespertino", error: '' },
  };
  const validationStateSchema = {
    cod_carrera: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_carrera: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    jornada: {
      required: true,
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
  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  };
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          error = {state.cod_carrera.error ? true : false}
          id="standard-name"
          label="Código de la carrera"
          name="cod_carrera"
          className={classes.textField}
          value={state.cod_carrera.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <TextField
          error={state.nombre_carrera.error ? true:false}
          id="standard-required"
          label="Nombre de la carrera"
          name="nombre_carrera"
          className={classes.textField}
          value={state.nombre_carrera.value}
          onChange={handleOnChange}
          margin="normal"
        />
        <br/>
        <br/>
        <FormLabel component="legend">Jornada</FormLabel>
        <RadioGroup aria-label="Jornada" name="jornada" value={state.jornada.value} onChange={handleOnChange}>
          <FormControlLabel value="Vespertino" control={<Radio />} label="Vespertino" />
          <FormControlLabel value="Diurno" control={<Radio />} label="Diurno" />
        </RadioGroup>
        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default CarreraForm
