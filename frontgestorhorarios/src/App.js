import React, {useEffect} from "react";

import NavBar from './componentes/navBar';
import Loader from './componentes/utils/Loader';
import Auth from './componentes/Auth/Auth';
import RightBar from './componentes/rightBar/rightBar';
import Notifications from './componentes/utils/Notifications';

import './CSS/generalCSS.css';

function App({children}) {

  return(
    <div>
      <NavBar />
      <RightBar />
      <Auth children={children} />
      <Loader />
      <Notifications />
    </div>
  )
}

export default App;
