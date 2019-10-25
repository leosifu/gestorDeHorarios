import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import SideBar from './componentes/vistaVerHorarios/sideBar/sideBar'
import App from './App'
import ListadoCarreras from './componentes/vistaPrincipal/mostrarCarreras/listadoCarreras'
import EditRamo from './componentes/vistaVerRamos/editRamo'
import VerMalla from './componentes/vistaVerRamos/verMalla'

const AppRoutes = ({store}) =>
  <Provider store = {store}>
    <App>
      <Switch>
        <Route exact path="/" component={ListadoCarreras}/>
        <Route exact path="/horario" component={SideBar} />
        <Route exact path="/ramos/edit" component={EditRamo} />
        <Route exact path="/malla/:id" component={VerMalla} />
      </Switch>
    </App>
  </Provider>;

export default AppRoutes;
