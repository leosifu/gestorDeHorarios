import React from 'react';

import axios from 'axios';
import clientAxios from '../../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, Paper, } from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, setProcesoActivo, handleNotifications, handleDialogCarrera, } from '../../../redux/actions'

import TablaCarrerasHeader from './tablaCarrerasHeader';
import TablaCarrerasBody from './tablaCarrerasBody';
import PrimaryButton from '../../utils/PrimaryButton';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}));

const TablaCarreras = ({carreras, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const openCreateModal = () => dispatch(handleDialogCarrera(true, 'create'));

  return (
    <>
      {/*<PrimaryButton onClick={openCreateModal} title='Nueva carrera'/>*/}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TablaCarrerasHeader />
          <TablaCarrerasBody carreras={carreras} />
        </Table>
      </TableContainer>
    </>
  )
}

export default TablaCarreras;
