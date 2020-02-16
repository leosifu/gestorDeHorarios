import React, {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import SetCoordinacionForm from './setCoordinacionForm'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AsociarCoord({asignaturaAct}){

  const classes = useStyles();

  const [carrera, setCarrera] = useState(0);
  const [malla, setMalla] = useState(0)
  const [asignatura, setAsignatura] = useState(0)
  const [coordinacion, setCoordinacion] = useState(0)
  const [coordinacionSelect, setCoordinacionSelect] = useState({})

  const [carreras, setCarreras] = useState([])
  const [mallas, setMallas] = useState([])
  const [asignaturas, setAsignaturas] = useState([])
  const [coordinaciones, setCoordinaciones] = useState([])

  console.log(asignaturaAct);

  const handleChangeCarrera = event => {
    setCarrera(event.target.value);
    setMalla(0)
    setAsignatura(0)
  };

  const handleChangeMalla = event => {
    setMalla(event.target.value);
    setAsignatura(0)
  };

  const handleChangeAsignatura = event => {
    setAsignatura(event.target.value);
  };

  const handleChangeCoordinacion = event => {
    setCoordinacion(event.target.value)
    console.log(event.target.value);
    console.log(coordinaciones);
    console.log(coordinaciones.find(coordinacion=>coordinacion.coordinacionId === event.target.value));
    setCoordinacionSelect(coordinaciones.find(coordinacion=>coordinacion.coordinacionId === event.target.value))
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/api/carreras')
    .then(res=>{
      setCarreras(res.data)
    })
  }, [])

  useEffect(()=>{
    var link ='http://localhost:8000/api/mallas/' + carrera
    axios.get(link)
    .then(res=>{
      setMallas(res.data)
    })
  }, [carrera])

  useEffect(()=>{
    var link ='http://localhost:8000/api/asignaturas/' + malla
    axios.get(link)
    .then(res=>{
      console.log(res.data);
      setAsignaturas(res.data)
    })
  }, [malla])

  useEffect(()=>{
    var link ='http://localhost:8000/api/coordinacions/' + asignatura
    axios.get(link)
    .then(res=>{
      console.log(res.data);
      setCoordinaciones(res.data)
    })
  }, [asignatura])



  return(
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Carrera
        </InputLabel>
        <Select
          id="demo-simple-select-outlined"
          value={carrera}
          onChange={handleChangeCarrera}
          labelWidth={30}
        >
          <MenuItem value="">
            <em>Seleccione Carrera</em>
          </MenuItem>
          {
            carreras.map(carrera=>(
              <MenuItem value={carrera.id}>{carrera.nombre_carrera}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {
        (carrera!==0)&&
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Malla
            </InputLabel>
            <Select
              id="demo-simple-select-outlined"
              value={malla}
              onChange={handleChangeMalla}
              labelWidth={30}
            >
              <MenuItem value="">
                <em>Seleccione Malla</em>
              </MenuItem>
              {
                mallas.map(malla=>(
                  <MenuItem value={malla.id}>{malla.nombre_malla}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
      }
      {
        (malla!==0) &&
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Asignatura
            </InputLabel>
            <Select
              id="demo-simple-select-outlined"
              value={asignatura}
              onChange={handleChangeAsignatura}
              labelWidth={30}
            >
              <MenuItem value="">
                <em>Seleccione Asignatura</em>
              </MenuItem>
              {
                asignaturas.map(asignatura=>(
                  <MenuItem value={asignatura.asignaturaId}>{asignatura.nombre_asignatura}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
      }
      {
        (asignatura !== 0) &&
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Coordinación
          </InputLabel>
          <Select
            id="demo-simple-select-outlined"
            value={coordinacion}
            onChange={handleChangeCoordinacion}
            labelWidth={30}
          >
            <MenuItem value="">
              <em>Seleccione Coordinación</em>
            </MenuItem>
            {
              coordinaciones.map(coordinacion=>(
                <MenuItem value={coordinacion.coordinacionId}>{coordinacion.nombre_coord}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      }
      {
        (coordinacion!==0) &&
        <>
          <SetCoordinacionForm coordinacion={coordinacionSelect} asignatura={asignatura} />
          <Button
            // onClick={asignarAsociacion}
            variant="contained" color="primary">
            Asociar Coordinacion
          </Button>
        </>
      }

    </>
  )
}
export default AsociarCoord
