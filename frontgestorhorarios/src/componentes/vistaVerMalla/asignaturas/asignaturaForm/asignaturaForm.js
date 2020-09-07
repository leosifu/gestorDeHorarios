import React from 'react';

import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import PrimaryButton from '../../../utils/PrimaryButton';
import SecondaryButton from '../../../utils/SecondaryButton';
import TextField from '../../../utils/TextField';

import useForm from '../../../form/useForm'
import AsignarAsignaturaForm from './formsAsignatura/asignarAsignaturaForm'
import TelAsignaturaForm from './formsAsignatura/telAsignaturaForm'
import HistorialForm from './formsAsignatura/historialForm'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
  },
  campoDes:{
    marginBottom: 10,
    padding: 10,
  },
  descripcion:{
    margin: 10,
    padding: 10,
    height: '4rem',
  },
  titulo:{
    margin: 10,
    padding: 10,
  }
}));

const AsignaturaForm = ({camposAsignatura, onSubmitForm, tipo, edit, eliminarAsignatura, }) => {

  const [stateC, ] = React.useState({
    checked: camposAsignatura.lab_independiente,
  });

  const stateSchema = {
    cod_asignatura: { value: camposAsignatura.cod_asignatura, error: '' },
    nombre_asignatura: { value: camposAsignatura.nombre_asignatura, error: '' },
    tel_T: { value: camposAsignatura.tel_T, error: '' },
    tel_E: { value: camposAsignatura.tel_E, error: '' },
    tel_L: { value: camposAsignatura.tel_L, error: '' },
    cupos_pasados: { value: camposAsignatura.cupos_pasados, error: '' },
    tasa_reprobacion: { value: camposAsignatura.tasa_reprobacion, error: '' },
    lab_independiente: { value: stateC.checked, checked:camposAsignatura.lab_independiente,
      error: '' },
    nivel: { value: camposAsignatura.nivel, error: '' },
    desinscripciones: {value: camposAsignatura.desinscripciones, error: ''}
  };
  const validationStateSchema = {
    cod_asignatura: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid first name format.',
      },
    },
    nombre_asignatura: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tel_T: {
      validator: {
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    },
    tel_E: {
      validator: {
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    },
    tel_L: {
      validator: {
        regEx: /^[0-9]$/,
        error: 'Invalid last name format.',
      },
    },
    cupos_pasados: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    tasa_reprobacion: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    desinscripciones: {
      validator: {
        regEx: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*/,
        error: 'Invalid last name format.',
      },
    },
    lab_independiente:{
    },
    nivel: {

    }
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  const classes = useStyles();
  return (
    <>
      <DialogContent>

        <AsignarAsignaturaForm handleOnChange={handleOnChange} cod_asignatura={state.cod_asignatura}
          nombre_asignatura={state.nombre_asignatura} />

        {
          edit &&
          <TextField
            error={state.nivel.error ? true:false}
            id="standard-required"
            label="Nivel"
            name="nivel"
            type="number"
            value={state.nivel.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
        }

        <TelAsignaturaForm handleOnChange={handleOnChange} tel_T={state.tel_T} tel_E={state.tel_E}
          tel_L={state.tel_L} lab_independiente={state.lab_independiente} />

        <HistorialForm handleOnChange={handleOnChange} cupos_pasados={state.cupos_pasados}
          tasa_reprobacion={state.tasa_reprobacion} desinscripciones={state.desinscripciones}/>

      </DialogContent>
      <DialogActions>
        {
          tipo !== 0 &&
          <PrimaryButton onClick={eliminarAsignatura} title={'Eliminar Asignatura'}/>
        }
        <PrimaryButton onClick={handleOnSubmit} title={
          tipo === 0 ? 'Crear asignatura' : 'Guardar cambios'
        }
        />
        {/*<Button onClick={handleOnSubmit} disabled={disable?true:(sumaTel?true:false)}
          variant="contained" color="primary" className={classes.button}>
          {
            tipo===0?
            <>Crear Asignatura</>
            :
            <>Guardar Cambios</>
          }
        </Button>*/}
        <SecondaryButton onClick={handleOnSubmit} title={'Cancelar'} />
      </DialogActions>
    </>
  );
};

export default AsignaturaForm
