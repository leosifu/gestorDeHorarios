import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import SideBar from './componentes/vistaVerHorarios/sideBar/sideBar'
import App from './App'
import ListadoCarreras from './componentes/vistaPrincipal/mostrarCarreras/listadoCarreras'
import VerMalla from './componentes/vistaVerMalla/verMalla'
import Procesos from './componentes/VistaVerProcesos/Procesos'

const AppRoutes = ({store}) =>
  <Provider store = {store}>
    <App>
      <Switch>
        <Route exact path="/" component={ListadoCarreras}/>
        <Route exact path="/horario/:id" component={SideBar} />
        <Route exact path="/malla/:id" component={VerMalla} />
        <Route exact path="/procesos/:id" component={Procesos} />
      </Switch>
    </App>
  </Provider>;

export default AppRoutes;
