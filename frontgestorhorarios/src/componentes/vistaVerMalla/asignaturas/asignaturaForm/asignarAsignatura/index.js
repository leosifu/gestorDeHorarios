import React, {useState, useEffect} from 'react';

import clientAxios from '../../../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch, } from 'react-redux';
import {setLoading, handleNotifications, } from '../../../../../redux/actions';

import AsignarAsignaturaCampos from './asignarAsignaturaCampos'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AsignarAsignatura({nivel, mallaId, estado, setEstado, open, setOpen, user, }){

  const classes = useStyles();
  const dispatch = useDispatch();

  const [carrera, setCarrera] = useState(0);
  const [malla, setMalla] = useState(0)
  const [asignatura, setAsignatura] = useState(0)
  const [asignaturaCod, setAsignaturaCod] = useState(0)
  const [asignaturaNombre, setAsignaturaNombre] = useState('')

  const [carreras, setCarreras] = useState([])
  const [mallas, setMallas] = useState([])
  const [asignaturas, setAsignaturas] = useState([])

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
    var asignaturaSelec = asignaturas.find(asign=>asign.asignaturaId === event.target.value)
    setAsignaturaCod(asignaturaSelec.cod_asignatura)
    setAsignaturaNombre(asignaturaSelec.nombre_asignatura)
  };

  const onSubmitForm = state=>{
    dispatch(setLoading(true));
    if (!state.nombre_asignatura.value || !state.cod_asignatura.value) {
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'info',
        message: 'Datos ingresados incompletos o incorrectos'}
      ));
    }
    else {
      const data = {
        asignaturaId: asignatura,
        mallaId: mallaId,
        nombre_asignatura: state.nombre_asignatura.value,
        cod_asignatura: state.cod_asignatura.value,
        nivel: nivel
      }
      clientAxios(user.idToken).post(`/api/infoAsignatura`, data)
      .then(res=>{
        setEstado(!estado);
        setOpen(false);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'success',
          message: 'Asignatura agregada'}
        ));
      })
      .catch(error=>{
        console.log(error);
        dispatch(setLoading(false));
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al agregar la asignatura'}
        ));
      })
    }
  }

  useEffect(()=>{
    dispatch(setLoading(true));
    clientAxios(user.idToken).get('/api/carreras')
    .then(res=>{
      console.log(res.data);
      setCarreras(res.data);
      dispatch(setLoading(false));
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
      console.log(res.data);
      setMallas(res.data);
      dispatch(setLoading(false));
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
      console.log(res.data);
      setAsignaturas(res.data);
      dispatch(setLoading(false));
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

  var camposAsignatura = {
    cod_asignatura: asignaturaCod,
    nombre_asignatura: asignaturaNombre,
  }

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
          <MenuItem value={-1}>
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
        (carrera!==0)?
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
              <MenuItem value={-1}>
                <em>Seleccione Malla</em>
              </MenuItem>
              {
                mallas.map(malla=>(
                  <MenuItem value={malla.id}>{malla.cod_malla}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        :<div/>
      }
      {
        (malla!==0)?
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
                asignaturas.map(asignatura=>(
                  <MenuItem value={asignatura.asignaturaId}>{asignatura.nombre_asignatura}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        :<div/>
      }
      {
        (asignatura!==0)&&
        <AsignarAsignaturaCampos camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm} />
      }
    </>
  )
}
export default AsignarAsignatura
