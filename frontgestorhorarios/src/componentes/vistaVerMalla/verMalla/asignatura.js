import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import VerAsignatura from '../asignaturas/verAsignatura'
import CrearAsignatura from '../asignaturas/asignaturaForm/crearAsignatura'

const useStyles = makeStyles(theme => ({
  card: {
    width: 140,
    margin: 8,
    marginBottom: 13,
    height: 145,
    //border: '1px solid red'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 12,
    color: '#B1B1B1'
  },
  oval:{
    m: 1,
    backgroundColor: '#E3E3E3',
    borderColor:'white',
    width: 100,
    height: 130,
    opacity:0.5
  },
  centrarIcon:{
    marginTop:'30%',
    marginLeft: '20%',
    color:'blue'
  },
}));

function Asignatura({nivel, requisitos, asignaturas, estado, setEstado, handleClick,
  edit, setEdit, activo, setActivo, mallaId, user, currentProceso, userRedux, carreraId, }) {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  function borde(id){
    if(activo===id){
      return {border:'2px solid green'}
    }
    else if (requisitos.indexOf(id)>-1){
      return {border:'2px solid yellow'}
    }
    else {
      return {border:'2px solid white'}
    }
  }

  return (
    <div style={{paddingTop:20}}>
      <Typography color="textSecondary" style={{position:'sticky'}} align="center">
        Nivel: {nivel}
      </Typography>
      {asignaturas.map(asignatura => (
        <Card className={classes.card} key={asignatura.id} style={ borde(asignatura.id) }>
          <CardContent style={{paddingLeft:0, paddingRight: 0}}>
            <Grid container style={{paddingLeft:16, paddingRight: 16}}>
              <Grid item xs={11}>
                <Typography className={classes.title} color="textSecondary" align="center"
                  onClick={event => {return handleClick(event, asignatura.id)}}>
                  Código: {asignatura.InfoAsignatura?.cod_asignatura}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {userRedux.status === 'login' && edit === 0 &&
                  <VerAsignatura cod_asignatura={asignatura.InfoAsignatura.cod_asignatura}
                    asignaturaId={asignatura.id} edit={edit} setEdit={setEdit}
                    activo={activo} setActivo={setActivo} user={user} userRedux={userRedux}
                    currentProceso={currentProceso} estadoM={estado} setEstadoM={setEstado}
                    carreraId={carreraId}
                  />
                }
              </Grid>
            </Grid>
            <Typography align="center" style={{fontSize:14, color: '#EA7600', height: 110}}
              onClick={event => {return handleClick(event, asignatura.id)}}>
              {asignatura.InfoAsignatura?.nombre_asignatura}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {
        (userRedux.status === 'login' &&
        (user.roles.includes('admin') || user.roles.includes('coordinador'))) ?
        <Card className={classes.card} style={{ display:'flex', justifyContent:'center' }}>
          <Box borderRadius="50%" border={1} className={classes.oval}>
            <CrearAsignatura nivel={nivel} open={open} setOpen={setOpen} estado={estado}
              setEstado={setEstado} carreraId={carreraId} user={user}
              currentProceso={currentProceso}
            />
          </Box>
        </Card>
        :
        <>
          {
            asignaturas.length === 0 &&
            <Card className={classes.card} style={{ display:'flex', justifyContent:'center' }}>
            </Card>
          }
        </>
      }
    </div>
  );
}

export default Asignatura
