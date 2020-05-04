import React, {useState, useEffect} from 'react';

import {Chip, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import clientAxios from '../../../../../config/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    padding: 10,
    width: 450
  },
}));

const AsignarProfesor = ({profesoresSelect, setProfesoresSelect, }) => {

  const classes = useStyles();

  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    clientAxios().get(`/api/profesores`)
    .then(res => {
      console.log(res.data);
      setProfesores(res.data);
    })
    .catch(error => {
      console.log(error);
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
        options={profesores}
        getOptionLabel={(option) => (`${option.name} ${option.lastName}`)}
        // defaultValue={[top100Films[13]]}
        onChange={(event, profesoresS) => handleChips(profesoresS)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Asignar Profesores"
            placeholder="Profesores"
          />
        )}
      />
    </div>
  )
}

export default AsignarProfesor;
