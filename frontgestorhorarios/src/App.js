import Routes from './routes'
import React from "react";
import ReactDOM from "react-dom";

import Content from './componentes/Children/Content'
import SideBar from './componentes/vistaVerHorarios/NavBar/Navbar'

function App({children}) {
  return(
    <div>
      <SideBar/>
      {/*<Content body={children} />*/}
    </div>
  )
}

export default App;
