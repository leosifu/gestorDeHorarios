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
    width: '93%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AsociarCoord({asignaturaAct, estado, setEstado, user, setCrear, cancelar, currentProceso, carreraId, }){

  const classes = useStyles();
  const dispatch = useDispatch();

  const [carrera, setCarrera] = useState(-1);
  const [malla, setMalla] = useState(-1)
  const [asignatura, setAsignatura] = useState(-1)
  const [coordinacion, setCoordinacion] = useState(-1)
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

  useEffect(() => {
    dispatch(setLoading(true));
    clientAxios(user.idToken).get(`/api/carrera/${currentProceso.id}`)
    .then(res => {
      console.log(res.data);
      setCarreras(res.data.filter(carrera => parseInt(carrera.id) !== parseInt(carreraId)));
      // setCarreras(res.data)
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
  }, []);

  // useEffect(()=>{
  //   dispatch(setLoading(true));
  //   clientAxios(user.idToken).get(`/api/mallas/${carrera}`)
  //   .then(res=>{
  //     setMallas(res.data)
  //     dispatch(setLoading(false))
  //   })
  //   .catch(error=>{
  //     console.log(error);
  //     dispatch(setLoading(false))
  //     dispatch(handleNotifications(true, {
  //       status: 'error',
  //       message: 'Ocurrió un error al cargar las mallas'}
  //     ));
  //   })
  // }, [carrera])

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get(`/api/asignaturas/${carrera}`)
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
  }, [carrera])

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
            id="demo-simple-select-outlined"
            value={carrera}
            onChange={handleChangeCarrera}
            labelWidth={30}
          >
            <MenuItem value={-1}>
              <em>Seleccione Carrera</em>
            </MenuItem>
            {
              carreras.map(carrera=>(
                <MenuItem value={carrera.id}>{carrera.nombre}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      }
      {/*
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
      */}
      {
        carrera > -1 &&
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
              <MenuItem value={-1}>
                <em>Seleccione Asignatura</em>
              </MenuItem>
              {
                asignaturas?.map(asignatura =>
                  <MenuItem value={asignatura.asignaturaId}>{asignatura.nombre_asignatura}</MenuItem>
                )
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
            value={coordinacion}
            onChange={handleChangeCoordinacion}
            labelWidth={30}
          >
            <MenuItem value={-1}>
              <em>Seleccione Coordinacion</em>
            </MenuItem>
            {
              coordinaciones?.map(coordinacion =>
                <MenuItem value={coordinacion.coordinacionId}>{`${coordinacion.cod_coord} - ${coordinacion.nombre_coord}`}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      }
      {
        (coordinacion > -1) &&
          <SetCoordinacionForm coordinacion={coordinacionSelect} asignaturaAct={asignaturaAct}
            estado={estado} setEstado={setEstado} user={user} setCrear={setCrear}
            cancelar={cancelar}
          />
      }

    </>
  )
}
export default AsociarCoord
