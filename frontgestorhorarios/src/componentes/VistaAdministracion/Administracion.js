import React, {useState, useEffect} from 'react';

import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, TextField, Grid, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {setLoading, } from '../../redux/actions'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px 50px 50px 50px'
  },
}));

const Administracion = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [])

  return (
    <div className={classes.root}>
      <h3>
        Administracion de Usuarios
      </h3>
      <Grid container>
        <Grid item xs={6}>

        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </div>
  )
}

export default Administracion;
