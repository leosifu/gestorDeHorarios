import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import SvgIcon from '@material-ui/core/SvgIcon';

import clientAxios from '../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {getProcesos, handleLoginUser, handleLogoutUser, handleLoginFailed, } from '../redux/actions'

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
}));

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

  const [log, setLog] = useState(false);
  const [user, setUser] = useState({
    log: false,
    user: {
      roles: [],
    }
  })

  useEffect(() => {
    login();
    console.log(process.env);
    console.log(window.REACT_APP_NAVBAR_COLOR);
    console.log(window.REACT_APP_ENVIRONMENT);
    console.log(window.REACT_APP_API_URL);
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
        console.log('Te has desconectado correctamente');
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

  const goAdmin = () => {
    dispatch(push('/administracion'))
  }

  const goHome = () => {
    dispatch(push('/'))
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={goHome}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Aca va el titulo
          </Typography>
          {
            user.user.roles.includes('admin') &&
            <Button onClick={goAdmin} color="inherit">Administración</Button>
          }
          {
            user.log?
            <Button onClick={handleLogout} color="inherit">Log out</Button>
            :
            <Button onClick={handleAuth} color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
