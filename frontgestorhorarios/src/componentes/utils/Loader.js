import React from 'react';

import {Backdrop, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 1000000,
    color: '#fff',
  },
}));

const LoadingSelector = createSelector(
  state => state.loading,
  loading => loading.loading
)

export default function Loader() {

  const classes = useStyles();
  const loading = useSelector(LoadingSelector);

  console.log(loading);

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
