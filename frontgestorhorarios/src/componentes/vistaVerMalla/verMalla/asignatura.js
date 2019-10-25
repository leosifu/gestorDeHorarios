import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import VerAsignatura from '../verAsignatura'
import CrearAsignatura from '../crearAsignatura'

const useStyles = makeStyles(theme => ({
  card: {
    width: 140,
    margin: 8,
    marginBottom: 13,
    height: 145
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
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

export default function Asignatura({nivel, asignaturas}) {
  const classes = useStyles();
  console.log(nivel);

  const [open, setOpen] = useState(false);

  return (
    <div style={{marginTop:20}}>
      <Typography color="textSecondary" align="center">
        Nivel: {nivel}
      </Typography>
      {asignaturas.map(asignatura=>(
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <Typography className={classes.title} color="textSecondary" align="center">
                  Código: {asignatura.cod_asignatura}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <VerAsignatura asignatura={asignatura}/>
              </Grid>
            </Grid>
            <Typography align="center" style={{fontSize:14, color: 'orange', height: '100%'}}>
              {asignatura.nombre_asignatura}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Card className={classes.card} style={{ display:'flex', justifyContent:'center' }}>
        <Box borderRadius="50%" border={1} className={classes.oval}>
          <CrearAsignatura open={open} setOpen={setOpen}/>
        </Box>
      </Card>
    </div>
  );
}
