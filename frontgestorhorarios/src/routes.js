import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Horarios from './componentes/vistaVerHorarios/Horarios/horarios'
import Malla from './componentes/Malla/Malla'
import ClippedDrawer from './componentes/vistaVerHorarios/NavBar/Navbar'
import App from './App'

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={Horarios} />
      <Route exact path="/contact" component={Malla} />
    </Switch>
  </App>;

export default AppRoutes;
