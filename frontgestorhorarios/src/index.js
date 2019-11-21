import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes';
import {createStore} from 'redux';
import Reducers from './redux/reducers';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import {loadState, saveState} from './localStorage';

const firebaseApp = firebase.initializeApp(firebaseConfig);


const estadoPer = loadState();
let store = createStore(Reducers, estadoPer);


store.subscribe( ()=>{
    saveState(
      {mallaId: store.getState().mallaId},

    );
  }
);


render(
    <Router>
      <AppRoutes store={store}/>
    </Router>,
  document.getElementById('root')
);
