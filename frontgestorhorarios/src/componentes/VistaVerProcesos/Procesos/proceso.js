import React, {useState} from 'react';
import { Link } from "react-router-dom";

import {Card, CardContent, CardActions, Collapse, IconButton, Typography, Grid,
  Button, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import EditarProceso from '../crearProceso/editarProceso'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    marginBottom:10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Proceso({proceso, changed, setChanged, }){

  const classes = useStyles();

  const [open, setOpen] = useState(false)

  const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  return(
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {proceso.nombre_malla + ' ' + proceso.semestre + '/' + proceso.año}
              </Grid>
              <Grid item xs={3}>
                <EditarProceso proceso={proceso} open={open} setOpen={setOpen} changed={changed}
                  setChanged={setChanged}/>
              </Grid>
            </Grid>
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" color="primary" component={Link1} to={"/malla/" + proceso.id}>
          Ver Malla
        </Button>
      </CardActions>
    </Card>
  )
}

export default Proceso;
