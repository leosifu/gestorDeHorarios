import React, {useState, useEffect, } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, IconButton, Menu, MenuItem, Typography} from '@material-ui/core';

import clientAxios from '../../../config/axios';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, handleNotifications, handleDialogAsignatura, } from '../../../redux/actions'

import TabsAsignatura from '../asignaturas/verAsignatura/tabs';

const DialogAsignaturaSelector = createSelector(
  state => state.dialogAsignatura,
  dialogAsignatura => dialogAsignatura
);

const DialogAsignatura = ({user, userRedux, currentProceso, estadoM, setEstadoM, carreraId, }) => {

  const dispatch = useDispatch();
  const dialogAsignatura = useSelector(DialogAsignaturaSelector);
  const {data} = dialogAsignatura;

  const [estado, setEstado] = useState(false);
  const [asignatura, setAsignatura] = useState({});
  const [infoAsignatura, setInfoAsignatura] = useState({});

  useEffect(()=>{
    if (dialogAsignatura.open) {
      dispatch(setLoading(true));
      clientAxios(user.idToken)
      .get(`/api/asignaturaInfo/${carreraId}/${data.asignaturaId}/${currentProceso.id}`)
      .then(res => {
        console.log(res.data);
        setInfoAsignatura(res.data)
        setAsignatura(res.data.Asignatura)
        dispatch(setLoading(false))
      })
      .catch((error)=>{
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar la asignatura'}
        ));
      });
    }
  },[dialogAsignatura.open, estado]);

  const handleClose = () => dispatch(handleDialogAsignatura());

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={dialogAsignatura.open}
      onClose={handleClose}
      style={{height:630}}
    >
     <TabsAsignatura infoAsignatura={infoAsignatura} asignatura={asignatura} estado={estado}
      setEstado={setEstado} user={user} userRedux={userRedux} currentProceso={currentProceso}
      estadoM={estadoM} setEstadoM={setEstadoM} carreraId={carreraId}
    />
    </Dialog>
  )
}

export default DialogAsignatura;
