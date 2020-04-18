import React, {useEffect} from "react";

import firebase from 'firebase';

import clientAxios from './config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {getProcesos, handleLoginUser, } from './redux/actions'

import Content from './componentes/Children/Content'
import NavBar from './componentes/navBar'
import Loader from './componentes/utils/Loader'

function App({children}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProcesos())
  }, []);

  return(
    <div>
      <NavBar />
      <Content body={children} />
      <Loader loading={false} />
    </div>
  )
}

export default App;
