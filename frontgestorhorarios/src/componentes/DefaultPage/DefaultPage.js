import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {setLoading, } from '../../redux/actions';

const DefaultPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [])

  return (
    <h3>
      Hay nah pa mostrar por el momento
      Salu2
    </h3>
  )
}

export default DefaultPage;
