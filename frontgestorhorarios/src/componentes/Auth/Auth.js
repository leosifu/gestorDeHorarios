import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {getProcesos, handleLoginUser, } from '../../redux/actions';

import Content from '../Children/Content'
import DefaultPage from '../DefaultPage/DefaultPage'
import NuevoProceso from '../VistaNuevoProceso/nuevoProceso'

const UserSelector = createSelector(
  state => state.user,
  user => user
);

function Auth({children}) {

  const dispatch = useDispatch();
  const userData = useSelector(UserSelector);

  const user = userData.user;

  useEffect(() => {
    if (!userData.loading) {
      if (userData.status === 'loginFailed') {
        dispatch(getProcesos());
      }
      else {
        dispatch(getProcesos(user.idToken));
      }
    }
  }, [userData]);

  if (userData.loading) {
    return (
      <div />
    )
  }
  else {
    return (
      <div>
        <Content body={children} />
      </div>
    )
  }

  // if (procesosData.error && userData.status === 'loginUser') {
  //   console.log('asdas');
  //   if (user.roles && user.roles.includes('admin')) {
  //     console.log('qweqwqwq');
  //     return (
  //       <NuevoProceso />
  //     )
  //   }
  //   else {
  //     return(
  //       <>
  //         <DefaultPage />
  //       </>
  //     )
  //   }
  // }
  // else {
  //   return(
  //     <div>
  //       <Content body={children} />
  //     </div>
  //   )
  // }
}

export default Auth;
