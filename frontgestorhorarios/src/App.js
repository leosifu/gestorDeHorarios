import React, {useEffect} from "react";

import NavBar from './componentes/navBar'
import Loader from './componentes/utils/Loader'
import Auth from './componentes/Auth/Auth'

function App({children}) {

  return(
    <div>
      <NavBar />
      <Auth children={children} />
      <Loader />
    </div>
  )
}

export default App;
