import React, {useState} from 'react';

import { Link } from "react-router-dom";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Collapse, IconButton, Typography, Grid, Button,
  } from '@material-ui/core';

import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

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

export default function Carrera({carrera, estado, setEstado, user, }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [openM, setOpenM] = useState(false);

  const [openC, setOpenC] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  return (
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {carrera.nombre_carrera}
              </Grid>
              <Grid item xs={3}>
                <CrearMalla carreraId={carrera.id} open={openM} setOpen={setOpenM} estado={estado}
                  setEstado={setEstado} user={user}/>
                <ActualizarCarrera carrera={carrera} open={openC} setOpen={setOpenC} estado={estado}
                  setEstado={setEstado} user={user}/>
              </Grid>
            </Grid>
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/*<Button component={Link1} to={"/procesos/" + carrera.id}>Procesos</Button>*/}
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
        {carrera.mallas &&
          <div>
            {carrera.mallas.map((malla, i) =>
                <CardContent key={malla.id}>
                  <Malla malla={malla} estado={estado} setEstado={setEstado}/>
                </CardContent>
            )}
          </div>
        }
      </Collapse>
    </Card>
  );
}
