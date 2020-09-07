import React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogActions, } from '@material-ui/core';

import TextField from '../../../utils/TextField';
import PrimaryButton from '../../../utils/PrimaryButton';
import SecondaryButton from '../../../utils/SecondaryButton';

import useForm from '../../../form/useForm'

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#EA7600',
      secondary: '#ee9133'
    },
  },
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

const MallaForm = ({cod_malla, fecha_resolucion, n_niveles, año, semestre, estado, setEstado,
  onSubmitForm, type, handleClose, setSelectedDate, }) => {

  const classes = useStyles();

  const stateSchema = {
    cod_malla: { value: cod_malla, error: '' },
    n_niveles: { value: n_niveles, error: '' },
  };
  const validationStateSchema = {
    cod_malla: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    n_niveles: {
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

  return (
    <>
      <DialogContent>
        <TextField
          error={state.cod_malla.error ? true:false}
          id="standard-required"
          label="Código de la malla"
          name="cod_malla"
          value={state.cod_malla.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeProvider theme={defaultMaterialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Resolución de la malla"
              value={fecha_resolucion}
              onChange={setSelectedDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              name="fecha_resolucion"
              className={classes.textField}
              style={{width: '40%', marginLeft: 30}}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
        <TextField
          error={state.n_niveles.error ? true:false}
          id="standard-required"
          label="Número de niveles"
          name="n_niveles"
          type="number"
          value={state.n_niveles.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <PrimaryButton onClick={handleOnSubmit}
            title={type === 'crear' ? 'Crear Malla' : 'Actualizar Malla'} />
          <SecondaryButton onClick={handleClose} title={'Cerrar'} />
        </DialogActions>
      </DialogActions>
    </>
  );
};

export default MallaForm
