import clientAxios from '../../config/axios'

import { push } from 'connected-react-router';

export const getProcesos = () => {
  return dispatch => {
    clientAxios().get(`/api/procesos`)
    .then(res => {
      if (res.data.length > 0) {
        const reverseProcesos = res.data.reverse();
        dispatch(setAllProcesos(reverseProcesos));
        const currentProcesoLocalStorage = localStorage.getItem('currentProcess')
        if (currentProcesoLocalStorage) {
          const procesoActivo = res.data.find(proceso => proceso.id === currentProcesoLocalStorage);
          if (procesoActivo) {
            dispatch(setProcesoActivo(procesoActivo));
          }
          else {
            dispatch(setProcesoActivo(reverseProcesos[0]));
          }
        }
        else {
          const procesoActivo = res.data.find(proceso => proceso.activo);
          if (procesoActivo) {
            dispatch(setProcesoActivo(procesoActivo));
          }
          else {
            dispatch(setProcesoActivo(reverseProcesos[0]));
          }
        }
      }
      else {
        dispatch(push(`/nuevoProceso`));
      }
    })
  }
}

export const setProcesoActivo = (proceso) => {
  if (proceso && proceso.id) {
    localStorage.setItem('currentProcess', proceso.id)
    return dispatch => dispatch(setProceso(proceso));
  }
};

const setProceso = (proceso) => ({
  type: 'setProceso',
  payload: proceso
});

export const setAllProcesos = (procesos) => {
  if (procesos) {
    return dispatch => dispatch(setProcesos(procesos));
  }
};

const setProcesos = (procesos) => ({
  type: 'setProcesos',
  payload: procesos
});