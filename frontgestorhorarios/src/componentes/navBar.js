import React, {useState, useEffect} from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from '@material-ui/icons/Menu';

import clientAxios from '../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {getProcesos, handleLoginUser, handleLogoutUser, handleLoginFailed, clearProcesosUser, handleRightBar, } from '../redux/actions'

import firebase from 'firebase';


const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#EA7600'
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '10%',
    height: '10%'
  },
  hide: {
    display: 'none',
  },
}));

const RightBarSelector = createSelector(
  state => state.rightBar,
  rightBar => rightBar
);

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso
);

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function NavBar() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const rightBar = useSelector(RightBarSelector);
  const procesosData = useSelector(ProcesosSelector);

  const currentProceso = procesosData.currentProceso;

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
    console.log(userData);
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

  const openDrawer = () => dispatch(handleRightBar(true));

  const goAdmin = () => {
    dispatch(push('/administracion'))
  }

  const goHome = () => {
    dispatch(push('/'))
  }

  const goMiHorario = () => {
    dispatch(push('/horarioProfesor'))
  }

  const goAdminProcesos = () => {
    dispatch(push('/nuevoProceso'));
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <img src="https://starejs.informatica.usach.cl/images/usach.png"
            alt="Italian Trulli" className={classes.logo}/>
          <Button onClick={goHome} color="inherit">
            <Typography variant="h6" className={classes.title}>
              {`Planificación Horarios DIINF `}
              {
                currentProceso.semestre >= 0 &&
                `${currentProceso.semestre}/${currentProceso.año}`
              }
            </Typography>
          </Button>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          {/*
            user.user.roles.includes('profe') &&
            <Button onClick={goMiHorario} color="inherit">Mi Horario</Button>
          }
          {
            user.user.roles.includes('admin') &&
            <>
              <Button onClick={goAdminProcesos} color="inherit">Administración de procesos</Button>
              <Button onClick={goAdmin} color="inherit">Administración de usuarios</Button>
            </>
          }
          {/*
            user.log?
            <Button onClick={handleLogout} color="inherit">Log out</Button>
            :
            <Button onClick={handleAuth} color="inherit">Login</Button>
          */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={openDrawer}
            className={clsx(rightBar.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
