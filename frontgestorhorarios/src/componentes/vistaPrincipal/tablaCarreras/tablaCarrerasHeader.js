import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {TableHead, TableRow, TableCell, } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TablaCarrerasHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Nombre de la carrera</StyledTableCell>
        <StyledTableCell>Acciones</StyledTableCell>
        <StyledTableCell>Opciones</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}

export default TablaCarrerasHeader;
