import React from "react";

import Content from './componentes/Children/Content'
import NavBar from './componentes/navBar'

function App({children}) {
  return(
    <div>
      <NavBar />
      <Content body={children} />
    </div>
  )
}

export default App;
