import React, {useState} from 'react'

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import CrearCoordinacion from '../crearCoordinacion'
import Coordinacion from './coordinacion'

const useStyles = makeStyles(theme => ({
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
  },
  crear:{
    margin: 20,
    height: 130,
  },
  centrarIcon:{
    color:'blue',
    marginTop:'7%',
    marginLeft: '43%'
  },
}));

function ListaCoord({coordinaciones, infoAsignatura, asignatura, lab_independiente, estado, setEstado}){
  const classes = useStyles();

  const [crear, setCrear] = useState(false)



  console.log(coordinaciones);

  const data = {
    cod_coord: '',
    nombre_coord: infoAsignatura.nombre_asignatura,
    tipo_coord: '',
  }

  function handleClick(e){
    e.preventDefault()
    setCrear(true)
  }

  function onSubmitForm(state){
    const num_bloques = function(){
      if(lab_independiente){
        switch (state.tipo_coord.value) {
          case "Teoría":
            return asignatura.tel_T/2
          case "Ejercicios":
            return asignatura.tel_E/2
          case "Laboratorio":
            return asignatura.tel_L/2
          default:
            return 0
        }
      }
      else{
        return (asignatura.tel_T + asignatura.tel_E + asignatura.tel_L)/2
      }
    }
    const data = {
      cod_coord: state.cod_coord.value,
      nombre_coord: state.nombre_coord.value,
      tipo_coord: state.tipo_coord.value,
      asignaturaId: asignatura.id,
      num_bloques: num_bloques()
    }
    console.log(data);
    axios.post('http://localhost:8000/api/coordinacion', data)
    .then(res => {
      console.log('hola');
      console.log(res.data);
      setCrear(false)
      setEstado(!estado)
    })
  }

  return(
    <>
      <Typography variant="h4" component="h3" className={classes.titulo}>
        Coordinaciones
      </Typography>
      {coordinaciones.map(coordinacion=>
        <Coordinacion coordinacion={coordinacion} />
      )}

      {crear?
        <CrearCoordinacion camposCord={data} onSubmitForm={onSubmitForm}
          lab_independiente={lab_independiente} estado={estado} setEstado={setEstado}/>
        :
        <Box className={classes.crear} borderRadius={1} boxShadow={2}>
          <IconButton className={classes.centrarIcon} onClick={handleClick}>
            <AddCircleOutlineOutlinedIcon fontSize='large'/>
          </IconButton>
        </Box>
      }
    </>
  )
}
export default ListaCoord
