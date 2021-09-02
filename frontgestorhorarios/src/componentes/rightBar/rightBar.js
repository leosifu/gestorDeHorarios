import React, {useState, useEffect, } from 'react';

import { useLocation } from 'react-router-dom';

import clsx from 'clsx';

import firebase from 'firebase';
import clientAxios from '../../config/axios';

import { makeStyles } from '@material-ui/core/styles';

import {Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {handleRightBar, handleDialogCarrera, handleLoginUser, handleLogoutUser, handleLoginFailed, clearProcesosUser,
  handleDialogNuevoProceso, } from '../../redux/actions';

import SelectProceso from '../VistaNuevoProceso/selectProceso';

const useStyles = makeStyles({
  list: {
    width: 250,
    minWidth: 250
  },
  fullList: {
    width: 'auto',
  },
});

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso
);

const RightBarSelector = createSelector(
  state => state.rightBar,
  rightBar => rightBar
);

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const RightBar = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const rightBar = useSelector(RightBarSelector);
  const procesosData = useSelector(ProcesosSelector);

  const location = useLocation();
  const divideLocation = location.pathname?.split('/');
  const currentLocation = divideLocation[1];

  const procesos = procesosData.procesos;
  const currentProceso = procesosData.currentProceso;

  const [date, setDate] = useState({});

  const [log, setLog] = useState(false);
  const [user, setUser] = useState({
    log: false,
    user: {
      roles: [],
    }
  })

  useEffect(() => {
    login();
  }, []);

  const loginRequest = (token, userData, authUser) => {
    clientAxios(token).post(`api/login`, userData)
    .then(res => {
      const userData = res.data;
      const roles = userData.roles.map(rol => rol.rol);
      const loginUser = {
        email: authUser.email,
        photoURL: authUser.photoURL,
        name: authUser.displayName,
        idToken: userData.token,
        roles: roles,
        id: userData.id
      }
      dispatch(handleLoginUser(loginUser));
      setUser({
        log: true,
        user: loginUser
      })
    })
    .catch(error => {
      const loginUser = {
        email: authUser.email,
        photoURL: authUser.photoURL,
        name: authUser.displayName,
        idToken: token,
        roles: []
      }
      dispatch(handleLoginUser(loginUser))
      setUser({
        log: true,
        user: loginUser
      })
    })
    setLog(true);
  }

  const login = () => {
    firebase.auth().onAuthStateChanged(authUser => {
      if(authUser) {
        return firebase.auth().currentUser.getIdToken()
          .then(idToken => {
            const userData = {
              email: authUser.email,
              name: authUser.displayName
            }
            loginRequest(idToken, userData, authUser)
            // axios.defaults.headers.common['Authorization'] = idToken;
            // Any extra code
          }).catch();
      }
      else {
        dispatch(handleLoginFailed());
      }
    });
  }

  function handleAuth (event) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      provider.setCustomParameters({
        'hd': 'usach.cl'
      });
      return (firebase.auth().signInWithPopup(provider)
        .then(
          result => {
            var token = result.credential.idToken;
            // setLog(true);
            login();
          }
        )
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
      );
    })
  }

  function handleLogout () {
    firebase.auth().signOut()
      .then(result => {
        dispatch(push('/'));
        dispatch(clearProcesosUser());
        dispatch(handleLogoutUser());
        // setLog(false);
        setUser({
          login: false,
          user: {
            roles: []
          }
        })
      })
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //
  //   setState({ ...state, [anchor]: open });
  // };

  const rightBarStatus = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    else {
      dispatch(handleRightBar(open));
    }
  }

  const goHome = () => {
    dispatch(push('/'));
  }

  const goAdmin = () => {
    dispatch(push('/administracion'));
  }

  const goMiHorario = () => {
    dispatch(push('/horarioProfesor'));
  }

  const goAdminProcesos = () => {
    dispatch(push('/nuevoProceso'));
  }

  const openCreateModal = () => {
    dispatch(handleRightBar(false));
    dispatch(handleDialogCarrera(true, 'create'));
  };

  const openNuevoProcesoModal = () => {
    dispatch(handleRightBar(false));
    dispatch(handleDialogNuevoProceso(true));
  };

  return (
    <Drawer anchor="right" open={rightBar?.open} onClose={rightBarStatus(false)}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: 'false',
        })}
        role="presentation"
        // onClick={rightBarStatus(false)}
        onKeyDown={rightBarStatus(false)}
      >
        <List>
          {
            user.log?
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>{<ArrowBackIosIcon />}</ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItem>
            :
            <ListItem button onClick={handleAuth}>
              <ListItemIcon>{<ArrowForwardIosIcon />}</ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          }
        </List>
        <Divider />
        {
          user.log &&
          <List>
            <ListItem button onClick={goHome}>
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary={'Inicio'} />
            </ListItem>
            {
              user.log && currentLocation === '' &&
              <ListItem button onClick={openNuevoProcesoModal}>
                <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
                <ListItemText primary={'Administración de procesos'} />
              </ListItem>
            }
            <ListItem button onClick={goAdmin}>
              <ListItemIcon>{<GroupIcon />}</ListItemIcon>
              <ListItemText primary={'Administración de usuarios'} />
            </ListItem>
            {
              (currentLocation || currentProceso.id < 0) ?
              <div />
              :
              <>
              <Divider />
              <div style={{marginLeft: 15, }}>
                <SelectProceso procesos={procesos} date={date} setDate={setDate}
                  currentProceso={currentProceso}
                />
              </div>
              </>
            }
          </List>
        }
        {
          user.log && currentLocation === '' && currentProceso.id > 0 &&
          <>
            <Divider />
            <List>
              <ListItem button onClick={openCreateModal}>
                <ListItemIcon>{<AddCircleIcon />}</ListItemIcon>
                <ListItemText primary={'Nueva carrera'} />
              </ListItem>
            </List>
          </>
        }
      </div>
    </Drawer>
  );
}

export default RightBar;
