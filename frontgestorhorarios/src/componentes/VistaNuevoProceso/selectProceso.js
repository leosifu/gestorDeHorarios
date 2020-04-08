import React, {useState, useEffect} from 'react'

import {FormControl, InputLabel, Select, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { setProcesoActivo, } from '../../redux/actions'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectProceso = ({procesos, date, setDate, currentProceso, }) => {

  const classes = useStyles();

  const [años, setAños] = useState([]);
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    setDate({age: currentProceso.año, semester: currentProceso.semestre})
  }, [procesos, currentProceso]);

  useEffect(() => {
    const añosP = procesos.map(proceso => proceso.año);
    setAños([...new Set(añosP)]);
    const semestresP = procesos.filter(proceso => proceso.año === currentProceso.año)
      .map(proceso => proceso.semestre);
    setSemestres(semestresP);
  }, [procesos, currentProceso]);

  const handleChange = (event) => {
    if (event.target.name === 'age') {
      const semestresP = procesos.filter(proceso => proceso.año === event.target.value)
        .map(proceso => proceso.semestre)
      setSemestres(semestresP);
      setDate({age: event.target.value, semester: semestresP[0]})
    }
    else {
      setDate({...date, semester: event.target.value})
    }
  };

  return(
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Año</InputLabel>
        {
          date.age &&
          <Select
            value={date.age}
            onChange={handleChange}
            name='age'
          >
            {
              años.map(año => <option value={año}>{año}</option>)
            }
          </Select>
        }
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Semestre</InputLabel>
        {
          date.semester &&
          <Select
            value={date.semester}
            onChange={handleChange}
            name='semester'
          >
            {
              semestres.map(semestre => <option value={semestre}>{semestre}</option>)
            }
          </Select>
        }
      </FormControl>
    </>
  )
}

export default SelectProceso;
