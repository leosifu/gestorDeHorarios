import React, {useState, useEffect} from 'react';

import clientAxios from '../../../../../config/axios';

import {Chip, } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../../redux/actions';

import TextField from '../../../../utils/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    padding: 10,
    width: 450
  },
  textField: {
    width: '99%',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {

    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EA7600"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      color: '#EA7600',
      borderColor: "#EA7600"
    }
  },
  formLabel: {
    '&.Mui-focused': {
      color: '#EA7600'
    }
  }
}));

const AsignarProfesor = ({profesoresSelect, setProfesoresSelect, user, showProfesores,
  currentProceso, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    dispatch(setLoading(true))
    clientAxios(user.idToken).get(`/api/profesores/${currentProceso.id}`)
    .then(res => {
      setProfesores(res.data);
      dispatch(setLoading(false));
    })
    .catch(error => {
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar los profesores'}
      ));
    })
  }, []);

  const handleChips = (profesoresS) => {
    setProfesoresSelect(profesoresS);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        // getOptionSelected={(option, value) => {
        //   console.log(option);
        //   console.log(value);
        //   return showProfesores.some(profesor => profesor.id === option.id)}
        // }
        value={profesoresSelect}
        options={profesores}
        getOptionLabel={(option) => (`${option.name} ${option.lastName}`)}
        // defaultValue={showProfesores ? showProfesores: []}
        onChange={(event, profesoresS) => handleChips(profesoresS)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.textField}
            InputLabelProps={{
              className: classes.formLabel
            }}
            variant="outlined"
            label="Asignar Profesores"
            placeholder="Profesores"
          />
        )}
      />
    </div>
  )
}

export default AsignarProfesor;
