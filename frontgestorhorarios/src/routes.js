import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, {history} from './redux/store';

import VistaPrincipal from './componentes/vistaPrincipal/VistaPrincipal';
import VistaVerHorarios from './componentes/vistaVerHorarios/VistaVerHorarios'
import App from './App'
import ListadoCarreras from './componentes/vistaPrincipal/mostrarCarreras/listadoCarreras'
import VerMalla from './componentes/vistaVerMalla/verMalla'
// import Procesos from './componentes/VistaVerProcesos/Procesos'
import NuevoProceso from './componentes/VistaNuevoProceso/nuevoProceso'
import Administracion from './componentes/VistaAdministracion/Administracion'
import HorarioProfesor from './componentes/vistaVerHorarios/HorarioProfesor/HorarioProfesor'

const AppRoutes = () =>
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={VistaPrincipal}/>
          <Route exact path="/horario/:carreraId" component={VistaVerHorarios} />
          <Route exact path="/malla/:carreraId" component={VerMalla} />
          {/*<Route exact path="/procesos/:carreraId" component={Procesos} />*/}
          <Route exact path="/nuevoProceso" component={NuevoProceso} />
          <Route exact path="/administracion" component={Administracion} />
          <Route exact path="/horarioProfesor" component={HorarioProfesor} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>;

export default AppRoutes;
