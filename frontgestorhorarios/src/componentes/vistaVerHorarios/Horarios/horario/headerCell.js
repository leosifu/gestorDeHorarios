import React, { useEffect, useRef, useLayoutEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {TableCell, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  encabezado:{
    maxWidth:100,
    minWidth: 100
  },
}));

const HeaderCell = ({dia, i, }) => {

  const classes = useStyles();

  return(
    <TableCell className={classes.encabezado} key={dia}>{dia}</TableCell>
  )
}

export default HeaderCell;
