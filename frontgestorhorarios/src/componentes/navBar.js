import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [log, setLog] = useState(false)

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
            console.log(result);
            console.log(`${result.user.email} ha iniciado sesión`);
            setLog(true)
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
        setLog(false)
      })
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {
            log?
            <Button onClick={handleLogout} color="inherit">Log out</Button>
            :
            <Button onClick={handleAuth} color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
