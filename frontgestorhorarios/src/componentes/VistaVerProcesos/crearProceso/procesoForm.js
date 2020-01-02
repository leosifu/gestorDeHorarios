import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, } from '@material-ui/core';
import useForm from '../../form/useForm'


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

const ProcesoForm = ({año, semestre, onSubmitForm, edit, activa}) => {
  const stateSchema = {
    año: {value: año, error: ''},
    semestre: {value: semestre, error: ''},
  };
  const validationStateSchema = {
    año: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    semestre: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
  };

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const disable = año > 0 && semestre > 0

  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
          <TextField
            error={state.año.error ? true:false}
            label="Año del Proceso"
            name="año"
            type="number"
            className={classes.textField}
            value={state.año.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={state.semestre.error ? true:false}
            label="Semestre del Proceso"
            name="semestre"
            type="number"
            className={classes.textField}
            value={state.semestre.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />

        <Button disabled={disable} onClick={ev=>onSubmitForm(state)}>
          Crear Proceso
        </Button>
      </form>
    </div>
  );
};

export default ProcesoForm
