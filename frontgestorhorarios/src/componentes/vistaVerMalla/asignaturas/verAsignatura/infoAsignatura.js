import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import EditAsignatura from '../asignaturaForm/editAsignatura'

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
  }
}));

export default function InfoAsignatura({infoAsignatura, asignatura, estado, setEstado, user,
  userRedux, estadoM, setEstadoM, }){

  const classes = useStyles();

  const [edit, setEdit] = useState(false)

  function clickEdit(){
    setEdit(true)
  }

  return(
    <>
      {
        edit?
          <>
            {
              userRedux.status === 'login' &&
              (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
              <EditAsignatura infoAsignatura={infoAsignatura} user={user}
                asignatura={asignatura} setEdit={setEdit} estado={estado} setEstado={setEstado}
                estadoM={estadoM} setEstadoM={setEstadoM}/>
            }
          </>
          :
          <>
          <Box className={classes.sector} borderRadius={1} boxShadow={2}>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h4" component="h3" className={classes.campoDes}>
                  {infoAsignatura.nombre_asignatura}
                </Typography>
              </Grid>
              {
                userRedux.status === 'login' &&
                (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
                <Grid item xs={1}>
                  <IconButton className={classes.centrarIcon} onClick={clickEdit}>
                    <EditIcon style={{color:"blue"}}/>
                  </IconButton>
                </Grid>
              }
            </Grid>
            <Typography className={classes.campoDes}>
              Código de la asignatura: {infoAsignatura.cod_asignatura}
            </Typography>
            <Typography className={classes.campoDes}>
              Descripción de la Asignatura:
            </Typography>
            <Box borderRadius={1} className={classes.descripcion}>
              Aca va la descripcion
            </Box>

            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  TEL:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Teoría: {asignatura.tel_T}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Ejercicios: {asignatura.tel_E}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.campoDes}>
                  Laboratorio: {asignatura.tel_L}
                </Typography>
              </Grid>
            </Grid>

            <Typography className={classes.campoDes}>
              Prerrequisitos:
            </Typography>
            {
              asignatura.requisitos.map(requisito=>
                  <Typography className={classes.campoDes}>{requisito.nombre_asignatura}</Typography>
              )
            }
          </Box>
          {
            userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <Box className={classes.sector} borderRadius={1} boxShadow={2}>
              <Typography variant="h4" component="h3" className={classes.campoDes}>
                Historial
              </Typography>
              <Typography className={classes.campoDes}>
                Cupos cupos estimados: {asignatura.historial.cupos_estimados}
              </Typography>
              <Typography className={classes.campoDes}>
                Cupos del semestre pasado: {asignatura.historial.cupos_pasados}
              </Typography>
              <Typography className={classes.campoDes}>
                Tasa de reprobación:{asignatura.historial.tasa_reprobacion + '%'}
              </Typography>
              <Typography className={classes.campoDes}>
                Desinscripciones actuales: 10
              </Typography>
            </Box>
          }
          </>
      }
    </>
  )
}
