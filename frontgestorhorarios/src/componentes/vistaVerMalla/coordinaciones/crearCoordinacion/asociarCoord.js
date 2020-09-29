import React, {useState, useEffect} from 'react'

import clientAxios from '../../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import SetCoordinacionForm from './setCoordinacionForm';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AsociarCoord({asignaturaAct, estado, setEstado, user, setCrear, }){

  const classes = useStyles();
  const dispatch = useDispatch();

  const [carrera, setCarrera] = useState(0);
  const [malla, setMalla] = useState(0)
  const [asignatura, setAsignatura] = useState(0)
  const [coordinacion, setCoordinacion] = useState(0)
  const [coordinacionSelect, setCoordinacionSelect] = useState({})

  const [carreras, setCarreras] = useState([])
  const [mallas, setMallas] = useState([])
  const [asignaturas, setAsignaturas] = useState([])
  const [coordinaciones, setCoordinaciones] = useState([])

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
    setCoordinacionSelect(coordinaciones.find(coordinacion=>
      coordinacion.coordinacionId == event.target.value))
  }

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get('/api/carreras')
    .then(res=>{
      setCarreras(res.data)
      dispatch(setLoading(false))
    })
    .catch(error=>{
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar las carreras'}
      ));
    })
  }, [])

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get(`/api/mallas/${carrera}`)
    .then(res=>{
      setMallas(res.data)
      dispatch(setLoading(false))
    })
    .catch(error=>{
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar las mallas'}
      ));
    })
  }, [carrera])

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get(`/api/asignaturas/${malla}`)
    .then(res=>{
      setAsignaturas(res.data)
      dispatch(setLoading(false))
    })
    .catch(error=>{
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar las asignaturas'}
      ));
    })
  }, [malla])

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get(`/api/coordinacions/${asignatura}`)
    .then(res=>{
      setCoordinaciones(res.data)
      dispatch(setLoading(false))
    })
    .catch(error=>{
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar las coordinaciones'}
      ));
    })
  }, [asignatura])



  return(
    <>
      {
        carreras.length > 0 &&
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Carrera
          </InputLabel>
          <Select
            multiple
            native
            inputProps={{
              id: 'select-multiple-nativ',
            }}
            id="demo-simple-select-outlined"
            value={carrera}
            onChange={handleChangeCarrera}
            labelWidth={30}
          >
            {
              carreras.map(carrera=>(
                <option value={carrera.id}>{carrera.nombre_carrera}</option>
              ))
            }
          </Select>
        </FormControl>
      }
      {
        (carrera!==0)&& mallas.length > 0 &&
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Malla
            </InputLabel>
            <Select
              id="demo-simple-select-outlined"
              multiple
              native
              inputProps={{
                id: 'select-multiple-nativ',
              }}
              value={malla}
              onChange={handleChangeMalla}
              labelWidth={30}
            >
              {
                mallas.map(malla=>(
                  <option value={malla.id}>{malla.cod_malla}</option>
                ))
              }
            </Select>
          </FormControl>
      }
      {
        (malla!==0) && asignaturas.length > 0 &&
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Asignatura
            </InputLabel>
            <Select
              id="demo-simple-select-outlined"
              multiple
              native
              inputProps={{
                id: 'select-multiple-nativ',
              }}
              value={asignatura}
              onChange={handleChangeAsignatura}
              labelWidth={30}
            >
              {
                asignaturas.map(asignatura=>(
                  <option value={asignatura.asignaturaId}>{asignatura.nombre_asignatura}</option>
                ))
              }
            </Select>
          </FormControl>
      }
      {
        (asignatura !== 0) && coordinaciones.length > 0 &&
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Coordinación
          </InputLabel>
          <Select
            id="demo-simple-select-outlined"
            multiple
            native
            inputProps={{
              id: 'select-multiple-nativ',
            }}
            value={coordinacion}
            onChange={handleChangeCoordinacion}
            labelWidth={30}
          >
            {
              coordinaciones.map(coordinacion=>(
                <option value={coordinacion.coordinacionId}>{coordinacion.nombre_coord}</option>
              ))
            }
          </Select>
        </FormControl>
      }
      {
        (coordinacion!==0) &&
          <SetCoordinacionForm coordinacion={coordinacionSelect} asignaturaAct={asignaturaAct}
            estado={estado} setEstado={setEstado} user={user} setCrear={setCrear}/>
      }

    </>
  )
}
export default AsociarCoord
