import React, {useState, useEffect} from 'react';

import { useParams, } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import clientAxios from '../../../config/axios'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setLoading} from '../../../redux/actions'
import {setMallaRedux} from '../../../redux/actions';

const drawerWidth = 100;

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: -5,
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    margin: '65px 0 0 0',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  horario:{
    margin:10
  },
  button: {
    position: 'sticky',
    top: '90%',
    left: '90%'
  },
}));

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

export default function SideBar({niveles, setNivel, }) {

  const classes = useStyles();

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        open={false}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {niveles.map((nivel, index) => (
            <ListItem button key={"Nivel" + nivel.nivel} onClick={event=>setNivel(nivel.nivel)}>
              <Divider />
              <ListItemText primary={"Nivel " + nivel.nivel} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
  );
}
