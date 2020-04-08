import React, {useState, useEffect} from 'react'

import {FormControl, InputLabel, Select, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Procesos = ({procesos, active}) => {

  const classes = useStyles();

  console.log(procesos);

  const [date, setDate] = useState({
    age: active ? active.año : procesos[0].año,
    semester: active ? active.semestre : procesos[0].semestre
  })
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    const semestresP = procesos.map(proceso => proceso.semestre);
    setSemestres(semestresP)
  }, [procesos])

  useEffect(() => {
    console.log('wiii');
  }, [date.semester])

  const handleChange = (event) => {
    setDate({...date, [event.target.name]: event.target.value})
  }

  return(
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          value={date.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
          }}
        >
          {
            semestres.map(semestre => <option value={semestre}>{semestre}</option>)
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          value={date.semester}
          onChange={handleChange}
          inputProps={{
            name: 'semester',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </>
  )
}

export default Procesos
