import React, {useState, useEffect} from 'react';

import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, TextField, Grid, Paper, List, ListItem,
  ListItemText, } from '@material-ui/core';

import { useDispatch, } from 'react-redux';
import {handleDialogCreate, handleDialogEdit, } from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 300,
    height: 340,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const VerUsuarios = ({title, usuarios, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [nuevoCoordinador, setNuevoCoordinador] = useState(false);

  const handleOpen = () => {
    dispatch(handleDialogCreate(true))
  }

  return (
    <>
      <h4>
        {title}
      </h4>
      <Button onClick={handleOpen}>
        Agregar {title === 'Coordinadores' ? 'Coordinador' : 'Profesor'}
      </Button>
      <div>
        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {usuarios.map((usuario) => (
                <ListItem key={usuario.id} role="listitem" button
                  onClick={() => dispatch(handleDialogEdit(true, usuario))}>
                  <ListItemText primary={`${usuario.name} ${usuario.lastName}`} />
                </ListItem>
              )
            )}
            <ListItem />
          </List>
        </Paper>
      </div>
    </>
  )
}

export default VerUsuarios;
