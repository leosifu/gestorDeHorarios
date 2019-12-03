import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AsociarCoord from './asociarCoord'

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

function Coordinacion({coordinacion}){
  const classes = useStyles();

  const [asociar, setAsociar] = useState(false)

  function handleAsociar(e){
    setAsociar(true)
  }

  return(
    <>
      <Box className={classes.sector} borderRadius={1} boxShadow={2} key={coordinacion.id}>
        <Typography className={classes.campoDes}>
          Código de la coordinación: {coordinacion.InfoCoordinacion.cod_coord}
        </Typography>
        <Typography className={classes.campoDes}>
          Nombre de la coordinación: {coordinacion.InfoCoordinacion.nombre_coord}
        </Typography>
        <Typography className={classes.campoDes}>
          Tipo: {coordinacion.tipo_coord}
        </Typography>
        <Typography className={classes.campoDes}>
          Profesor Asignado: Roberto Gonzalez
        </Typography>
        {
          asociar?
          <AsociarCoord coordinacion={coordinacion}/>:
          <Button onClick={handleAsociar} variant="contained" color="primary">
            Asociar Coordinacion
          </Button>
        }
      </Box>
    </>
  )
}
export default Coordinacion
