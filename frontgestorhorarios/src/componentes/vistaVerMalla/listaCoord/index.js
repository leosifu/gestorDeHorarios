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

  function handleClick(e){
    e.preventDefault()
    setCrear(true)
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
        <CrearCoordinacion estado={estado} setEstado={setEstado} lab_independiente={lab_independiente}
          nombre_asignatura={infoAsignatura.nombre_asignatura} asignatura={asignatura} crear={crear}
          setCrear={setCrear}/>
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
