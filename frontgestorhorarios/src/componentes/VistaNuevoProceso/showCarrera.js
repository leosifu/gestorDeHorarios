import React from 'react';

import {Paper, Checkbox, FormControlLabel, FormControl, FormGroup, Divider, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowMalla from './showMalla'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  process: {
    margin: '5%'
  }
}));

const ShowCarrera = ({carrera}) => {

  const classes = useStyles();

  return(
    <Paper className={classes.process}>
      <FormControl component="fieldset">
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label={carrera.nombre_carrera}
        />
      </FormControl>
      <Divider/>
      <FormGroup>
      {
        carrera.mallas.map(malla =>
          <ShowMalla malla={malla} />
        )
      }
      </FormGroup>
    </Paper>
  )
}

export default ShowCarrera;
