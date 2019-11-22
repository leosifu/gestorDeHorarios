import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';

import VerAsignatura from '../verAsignatura'
import CrearAsignatura from '../asignaturaForm/crearAsignatura'

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

function Asignatura({nivel, requisitos, asignaturas, estado, setEstado, mallaId, handleClick,
  edit, setEdit, activo, setActivo}) {

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
      {asignaturas.map(asignatura=>(
        <Card className={classes.card} key={asignatura.id} style={ borde(asignatura.id) }>
          <CardContent style={{paddingLeft:0, paddingRight: 0}}>
            <Grid container style={{paddingLeft:16, paddingRight: 16}}>
              <Grid item xs={11}>
                <Typography className={classes.title} color="textSecondary" align="center" onClick={event => {return handleClick(event, asignatura.id)}}>
                  Código: {asignatura.InfoAsignatura.cod_asignatura}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {edit===0?
                  <VerAsignatura cod_asignatura={asignatura.InfoAsignatura.cod_asignatura} asignaturaId={asignatura.id} edit={edit} setEdit={setEdit}
                    activo={activo} setActivo={setActivo}/>:
                  <div/>
                }
              </Grid>
            </Grid>
            <Typography align="center" style={{fontSize:14, color: 'orange', height: 110}} onClick={event => {return handleClick(event, asignatura.id)}}>
              {asignatura.InfoAsignatura.nombre_asignatura}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Card className={classes.card} style={{ display:'flex', justifyContent:'center' }}>
        <Box borderRadius="50%" border={1} className={classes.oval}>
          <CrearAsignatura mallaId={mallaId} nivel={nivel} open={open} setOpen={setOpen} estado={estado} setEstado={setEstado}/>
        </Box>
      </Card>
    </div>
  );
}
const mapStateToProps = state => {
    return {
        mallaId: state.mallaId
    }
}

export default connect(mapStateToProps)(Asignatura)
