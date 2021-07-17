import React, { useEffect, useRef, useLayoutEffect, useState} from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {TableCell, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  encabezado:{
    maxWidth:100,
    minWidth: 100
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#EC7700',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const HeaderCell = ({dia, i, }) => {

  const classes = useStyles();

  return(
    <StyledTableCell className={classes.encabezado} key={dia}>{dia}</StyledTableCell>
  )
}

export default HeaderCell;
