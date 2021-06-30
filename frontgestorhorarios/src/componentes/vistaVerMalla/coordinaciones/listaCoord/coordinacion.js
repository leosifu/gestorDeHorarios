import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import EditCoordinacion from '../crearCoordinacion/editCoord';

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
  miniTitle: {
    fontWeight: 'bold',
    marginRight: 5
  },
  dates: {
    display: 'flex',
    marginBottom: 10,
    padding: 10,
  },
  profes: {
    marginBottom: 10,
    padding: 10,
  },
}));

function Coordinacion({coordinacion, estado, setEstado, user, userRedux, currentProceso, }){
  const classes = useStyles();

  const [asociar, setAsociar] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleAsociar(e){
    setAsociar(true);
  }

  const clickEdit = () => {
    setEdit(true);
  }

  return(
    <>
      {
        edit ?
        <>
          {
            userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <EditCoordinacion estado={estado} setEstado={setEstado} coordinacion={coordinacion}
              edit={edit} setEdit={setEdit} user={user} profesores={coordinacion.profesores.map(profesor => ({
                createdAt: profesor.createdAt,
                email: profesor.email,
                id: profesor.id,
                lastName: profesor.lastName,
                name: profesor.name,
                phone: profesor.phone,
                rut: profesor.rut,
                updatedAt: profesor.updatedAt
              }))} currentProceso={currentProceso}/>
          }
        </>
        :
        <Box className={classes.sector} borderRadius={1} boxShadow={2} key={coordinacion.id}>
          <Grid container>
            <Grid item xs={10}>
              <div className={classes.dates}>
                <Typography className={classes.miniTitle}>
                  {`Código de la coordinación:`}
                </Typography>
                <Typography >
                  {`${coordinacion.InfoCoordinacion.cod_coord}`}
                </Typography>
              </div>
            </Grid>
            {
              userRedux.status === 'login' &&
              (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
              <Grid item xs={2}>
                <IconButton className={classes.centrarIcon} onClick={clickEdit}>
                  <EditIcon style={{color:"blue"}}/>
                </IconButton>
              </Grid>
            }
          </Grid>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Nombre de la coordinación:`}
            </Typography>
            <Typography >
              {`${coordinacion.InfoCoordinacion.nombre_coord}`}
            </Typography>
          </div>
          <div className={classes.dates}>
            <Typography className={classes.miniTitle}>
              {`Tipo:`}
            </Typography>
            <Typography >
              {`${coordinacion.tipo_coord}`}
            </Typography>
          </div>
          <div className={classes.profes}>
            <Typography className={classes.miniTitle}>
              {`Profesor Asignado:`}
            </Typography>
            {
              coordinacion.profesores.map(profesor =>
                <div key={profesor.id}>
                {` ${profesor.name} ${profesor.lastName}\n`}
                </div>
              )
            }
          </div>
        </Box>
      }
    </>
  )
}
export default Coordinacion
