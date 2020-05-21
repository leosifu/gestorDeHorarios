import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, Typography, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleDialogInfoCoordinacion, } from '../../../../redux/actions';

const DialogInfoCoordinacionSelector = createSelector(
  state => state.dialogInfoCoordinacion,
  dialogInfoCoordinacion => dialogInfoCoordinacion
);

const useStyles = makeStyles({
  contenido:{
    height: 90,
    padding: '3px 3px 3px 3px',
    "&:last-child": {
      paddingBottom: 3
    },
    fontSize: 11
  },
  nombreCoord:{
    fontSize: 13,
  },
  textos: {
    margin: 10,
  }
});

const InfoCoordinacion = ({}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const dialogInfoCoordinacion = useSelector(DialogInfoCoordinacionSelector);

  const {coordinacion, open} = dialogInfoCoordinacion;

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title"
        onClose={() => dispatch(handleDialogInfoCoordinacion(false))}>
        <DialogTitle id="form-dialog-title">
          Información de la Coordinación
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.textos}>
            Asignatura: {`${coordinacion.nombre_coord}`}
          </Typography>
          <Typography className={classes.textos}>
            Código de asignatura: {`${coordinacion.cod_asignatura}`}
          </Typography>
          <Typography className={classes.textos}>
            Código de coordinación: {`${coordinacion.cod_coord}`}
          </Typography>
          <Typography className={classes.textos}>
            Profesores:
          </Typography>
          {
            coordinacion.profesores && coordinacion.profesores.map(profesor => (
              <Typography className={classes.textos}>
                {`${profesor.name} ${profesor.lastName}`}
              </Typography>
            ))
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InfoCoordinacion;
