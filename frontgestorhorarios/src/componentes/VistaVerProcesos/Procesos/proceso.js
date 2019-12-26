import React, {useState} from 'react';
import { Link } from "react-router-dom";

import {Card, CardContent, CardActions, Collapse, IconButton, Typography, Grid,
  Button, } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions'

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

function Proceso(props){

  const classes = useStyles();

  const { proceso} = props

  console.log(proceso.id);

  function onClick(){
    props.setMallaId(proceso.id)
  }

  const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  return(
    <Card className={classes.card}>
      <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Grid container>
              <Grid item xs={9}>
                {proceso.nombre_malla + ' ' + proceso.semestre + '/' + proceso.año}
              </Grid>
            </Grid>
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button component={Link1} to={"/malla/" + proceso.id} onClick={onClick}>Ver Malla</Button>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
    return {
        mallaId: state.mallaId
    }
}

export default connect(mapStateToProps, actions)(Proceso)
