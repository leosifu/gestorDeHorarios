import React, {useEffect} from "react";

import firebase from 'firebase';

import Content from './componentes/Children/Content'
import NavBar from './componentes/navBar'
import Loader from './componentes/utils/Loader'

function App({children}) {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      console.log(authUser);
    });
  }, [])

  return(
    <div>
      <NavBar />
      <Content body={children} />
      <Loader loading={false} />
    </div>
  )
}

export default App;
