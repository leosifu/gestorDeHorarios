import React, {useState} from 'react'

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

function ListaCoord({coordinaciones, infoAsignatura, asignatura, lab_independiente, estado,
  setEstado, user, userRedux, currentProceso, }){

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
        <Coordinacion coordinacion={coordinacion} key={coordinacion.id} estado={estado}
          setEstado={setEstado} user={user} userRedux={userRedux} currentProceso={currentProceso}/>
      )}

      {crear ?
        <>
          {
            userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <CrearCoordinacion estado={estado} setEstado={setEstado} lab_independiente={lab_independiente}
              nombre_asignatura={infoAsignatura.nombre_asignatura} asignatura={asignatura} crear={crear}
              setCrear={setCrear} user={user} currentProceso={currentProceso}/>
          }
        </>
        :
        <>
          {
            (userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador'))) ?
            <Box className={classes.crear} borderRadius={1} boxShadow={2}>
              <IconButton className={classes.centrarIcon} onClick={handleClick}>
                <AddCircleOutlineOutlinedIcon fontSize='large'/>
              </IconButton>
            </Box>
            :
            <>
              {
                coordinaciones.length === 0 &&
                <Box className={classes.crear} borderRadius={1} boxShadow={2}>
                </Box>
              }
            </>
          }
        </>
      }
    </>
  )
}
export default ListaCoord
