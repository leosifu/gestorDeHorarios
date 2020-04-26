import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useForm from '../../../form/useForm'


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

const MallaForm = ({cod_malla, res_malla, n_niveles, año, semestre, estado, setEstado, onSubmitForm}) => {
  const stateSchema = {
    res_malla: { value: res_malla, error: '' },
    cod_malla: { value: cod_malla, error: '' },
    n_niveles: { value: n_niveles, error: '' },
  };
  const validationStateSchema = {
    res_malla: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    cod_malla: {
      required: true,
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    n_niveles: {
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

  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <TextField
          error = {state.res_malla.error ? true : false}
          id="standard-name"
          label="Resolución de la malla"
          name="res_malla"
          className={classes.textField}
          value={state.res_malla.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          error={state.cod_malla.error ? true:false}
          id="standard-required"
          label="Código de la malla"
          name="cod_malla"
          className={classes.textField}
          value={state.cod_malla.value}
          onChange={handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <div className="flex">
          <TextField
            error={state.n_niveles.error ? true:false}
            id="standard-required"
            label="Número de niveles"
            name="n_niveles"
            type="number"
            className={classes.textField}
            value={state.n_niveles.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default MallaForm
