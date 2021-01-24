import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Paper, List, ListItem,
  ListItemText, } from '@material-ui/core';

import TextField from '../utils/TextField';

import { useDispatch, } from 'react-redux';
import {handleDialogEdit, } from '../../redux/actions'

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
  const [search, setSearch] = useState('');

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <>
      <h4>
        {title}
      </h4>
      <div>
        <TextField
          margin="dense"
          variant="outlined"
          id="search"
          label="Buscar"
          value={search}
          onChange={handleOnChange}
        />
        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {usuarios.filter(usuario =>
              (search !== '' ? (`${usuario.name} ${usuario.lastName}`.toUpperCase().indexOf(search.toUpperCase()) > -1) : usuario)
            )
              .map((usuario) => (
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
