import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Malla from './mallas'
import CrearMalla from '../formularios/formMalla/crearMalla'
import ActualizarCarrera from '../formularios/formCarrera/actualizarCarrera'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    marginBottom:10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Carrera({carrera, estado, setEstado}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [openM, setOpenM] = useState(false);

  const [openC, setOpenC] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {carrera.nombre_carrera}
              </Grid>
              <Grid item xs={3}>
                <CrearMalla carreraId={carrera.id} open={openM} setOpen={setOpenM} estado={estado} setEstado={setEstado}/>
                <ActualizarCarrera carrera={carrera} open={openC} setOpen={setOpenC} estado={estado} setEstado={setEstado}/>
              </Grid>
            </Grid>
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {carrera.mallas?
          <div>
            {carrera.mallas.map((malla, i)=>{
              return(
                <CardContent>
                  <Malla carreraId={carrera.id} malla={malla} estado={estado} setEstado={setEstado}/>
                </CardContent>
              )
            })}
           </div>:
          <div/>}
      </Collapse>
    </Card>
  );
}
