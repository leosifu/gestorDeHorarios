import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {TableRow, TableCell, } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import {handleDialogCarrera, } from '../../../redux/actions'

import PrimaryButton from '../../utils/PrimaryButton';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: 10,
  },
  buttonsCell: {
    display: 'flex'
  },
  button: {
    marginRight: 20
  }
}));

const TablaCarrerasRow = ({carrera, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const redirectMalla = () => {
    dispatch(push(`/malla/${carrera.id}`))
  }

  const redirectHorario = () => {
    dispatch(push(`/horario/${carrera.id}`))
  }

  const openEditHorario = () => dispatch(handleDialogCarrera(true, 'edit', carrera));

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {`${carrera.nombre} - ${carrera.jornada} (${carrera.año})`}
      </TableCell>
      <TableCell>
        <div className={classes.buttonsCell}>
          <div className={classes.button}>
            <PrimaryButton onClick={redirectMalla} title={'Ver Malla'}/>
          </div>
          <div className={classes.button}>
            <PrimaryButton onClick={redirectHorario} title={'Horarios'} />
          </div>
        </div>
      </TableCell>
      <TableCell className={classes.buttonsCell}>
        <div className={classes.button}>
          <PrimaryButton title={'Editar carrera'} onClick={openEditHorario}/>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default TablaCarrerasRow;
