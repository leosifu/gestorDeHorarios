import React from 'react';
import { Link } from "react-router-dom";

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
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import CrearMalla from '../formularios/formMalla/crearMallaDialog'

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

function Mallas(mallas){
  console.log(mallas);
  if(typeof mallas !== 'undefined'){
    var mallasR = mallas.mallas;
    console.log(mallasR);
    const ListaMallas = mallasR.map((malla, i)=>(
      <Card key={i}>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              {malla.nombre_malla}
            </Grid>
            <Grid item xs={2}>
              <Fab color="secondary" size="small" aria-label="edit">
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
          >
            <Button>Ver Ramos</Button>
            <Button><Link style={{ textDecoration: 'none', color:'white' }} to="/horario">Horarios</Link></Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    ))
    return(
      <CardContent>
        {ListaMallas}
      </CardContent>
    )
  }
}

export default function Carrera({title, mallas, carreraId}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("HOLA", carreraId);


  return (
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {title}
              </Grid>
              <Grid item xs={3}>
                <CrearMalla carreraId={carreraId}/>
                <Fab color="secondary" size="small" aria-label="edit" className={classes.margin}>
                  <EditIcon />
                </Fab>
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
        {mallas? <Mallas mallas={mallas}/>:<div/>}
      </Collapse>
    </Card>
  );
}
