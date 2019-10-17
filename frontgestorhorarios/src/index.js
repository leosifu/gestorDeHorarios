import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes';
import {createStore} from 'redux';
import Reducers from './redux/reducers';

let store = createStore(Reducers);

render(
    <Router>
      <AppRoutes store={store}/>
    </Router>,
  document.getElementById('root')
);
