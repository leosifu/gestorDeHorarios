import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, {history} from './redux/store';

import SideBar from './componentes/vistaVerHorarios/sideBar/sideBar'
import App from './App'
import ListadoCarreras from './componentes/vistaPrincipal/mostrarCarreras/listadoCarreras'
import VerMalla from './componentes/vistaVerMalla/verMalla'
import Procesos from './componentes/VistaVerProcesos/Procesos'
import NuevoProceso from './componentes/VistaNuevoProceso/nuevoProceso'
import Administracion from './componentes/VistaAdministracion/Administracion'

const AppRoutes = () =>
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={ListadoCarreras}/>
          <Route exact path="/horario/:mallaId" component={SideBar} />
          <Route exact path="/malla/:mallaId" component={VerMalla} />
          <Route exact path="/procesos/:carreraId" component={Procesos} />
          <Route exact path="/nuevoProceso" component={NuevoProceso} />
          <Route exact path="/administracion" component={Administracion} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>;

export default AppRoutes;
