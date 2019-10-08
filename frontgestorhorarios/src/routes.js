import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideBar from './componentes/vistaVerHorarios/sideBar/sideBar'
import App from './App'
import ListadoCarreras from './componentes/vistaPrincipal/mostrarCarreras/listadoCarreras'

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={ListadoCarreras}/>
      <Route exact path="/horario" component={SideBar} />
    </Switch>
  </App>;

export default AppRoutes;
