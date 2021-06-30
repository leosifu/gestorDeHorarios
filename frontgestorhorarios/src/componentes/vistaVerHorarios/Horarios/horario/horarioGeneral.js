import React, { useState, useCallback, useEffect } from 'react';

import { useParams} from "react-router";

import axios from 'axios';
import clientAxios from '../../../../config/axios';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setLoading, handleNotifications, } from '../../../../redux/actions';

import Horario from './horario';

const colores = ['#F012BE', '	#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#FFDC00',
  '#FF851B', '#FF4136']

const getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
)

function GetDataHorario({nivel, user, currentProceso, userRedux, dontDrag, selected, verTope, tope, topes, carreraId,
  niveles, setNivel, }) {

  const dispatch = useDispatch();

  const malla = useSelector(MallaSelector);

  const [data, setData] = useState([]);

  const [bloques, setBloques] = useState([]);

  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(()=>{
    dispatch(setLoading(true));
    axios.all(
      [
        clientAxios(user.idToken).get(`/api/asignatura/${carreraId}/${nivel}/${currentProceso.id}`),
        ...(topes ? topes.map(tope => clientAxios(user.idToken).get(`/api/asignatura/${carreraId}/${tope}/${currentProceso.id}`)) : [])
      ]
    )
    .then(axios.spread((...responses) => {
      const [activeLevel, ...topesLevels] = responses;
      console.log(activeLevel);
      console.log(topesLevels);
      const {data} = activeLevel;
      const resTopes = [];
      resTopes.push(...topesLevels.map(res => res.data));
      // console.log(resTopes);
      // console.log(resTopes.flat());
      const dataTopes = resTopes.flat();
      // dataTopes.push(...resTopes.map(d => d));
      console.log(dataTopes);
      const asignaturas = data.map(asignatura => ({nombre_asignatura: asignatura.nombre_asignatura,
        cod_asignatura: asignatura.cod_asignatura, asignaturaId: asignatura.id}));
      setAsignaturas(asignaturas);
      const bloquesMatrix = data.map((asignatura, i) => {
        if (asignatura.coordinaciones.length > 0) {
          let nombreBloque, areDistinct = false;
          if (asignatura.nombre_asignatura === asignatura.coordinaciones[0].InfoCoordinacion.nombre_coord) {
            areDistinct = false;
            nombreBloque = asignatura.coordinaciones[0].InfoCoordinacion.nombre_coord
          }
          else {
            const coordinacionesNames = asignatura.coordinaciones.map(coord =>
              coord.InfoCoordinacion.nombre_coord)
              if (coordinacionesNames.every( (val, i, arr) => val === arr[0] ) ) {
                areDistinct = false;
                nombreBloque = asignatura.nombre_asignatura;
              }
              else {
                areDistinct = true;
              }
            }
            const coordinacionesAsign = asignatura.coordinaciones.map(coordinacion => {
              const color = getRandomColor();
              const Bloques = coordinacion.bloques.map(bloque=>{
                bloque.asignaturaId = asignatura.id
                bloque.profesores = coordinacion.profesores
                bloque.cod_asignatura = asignatura.cod_asignatura
                bloque.nombre_coord = areDistinct ?
                  coordinacion.InfoCoordinacion.nombre_coord : nombreBloque;
                bloque.cod_coord = coordinacion.InfoCoordinacion.cod_coord
                bloque.mostrar = true
                bloque.size = 1
                bloque.color = color
                return bloque
              })
              return Bloques
            })
            return coordinacionesAsign
        }
        else {
          return []
        }
      })
      const bloquesTopes = dataTopes.map((asignatura, i) => {
        if (asignatura.coordinaciones.length > 0) {
          let nombreBloque, areDistinct = false;
          if (asignatura.nombre_asignatura === asignatura.coordinaciones[0].InfoCoordinacion.nombre_coord) {
            areDistinct = false;
            nombreBloque = asignatura.coordinaciones[0].InfoCoordinacion.nombre_coord
          }
          else {
            const coordinacionesNames = asignatura.coordinaciones.map(coord =>
              coord.InfoCoordinacion.nombre_coord)
              if (coordinacionesNames.every( (val, i, arr) => val === arr[0] ) ) {
                areDistinct = false;
                nombreBloque = asignatura.nombre_asignatura;
              }
              else {
                areDistinct = true;
              }
            }
            const coordinacionesAsign = asignatura.coordinaciones.map(coordinacion => {
              const color = getRandomColor();
              const Bloques = coordinacion.bloques.map(bloque=>{
                bloque.asignaturaId = asignatura.id;
                bloque.profesores = coordinacion.profesores;
                bloque.cod_asignatura = asignatura.cod_asignatura;
                bloque.nombre_coord = areDistinct ?
                  coordinacion.InfoCoordinacion.nombre_coord : nombreBloque;
                bloque.cod_coord = coordinacion.InfoCoordinacion.cod_coord;
                bloque.mostrar = true;
                bloque.size = 1;
                bloque.color = color;
                bloque.imTope = true;
                return bloque
              })
              return Bloques
            })
            return coordinacionesAsign
        }
        else {
          return []
        }
      })
      console.log(bloquesTopes);
      console.log(bloquesTopes.flat().flat());
      var bloques = [...bloquesMatrix.flat().flat(), ...bloquesTopes.flat().flat()];
      console.log(bloques);
      // bloquesMatrix.map(bloqueM => bloques = bloques.concat(...bloqueM));

      setData(bloques);
      dispatch(setLoading(false));
      // console.log(responses);
      // use/access the results
    })).catch(error => {
      console.log(error);
      // react on errors.
    });
  },[nivel, carreraId, topes, currentProceso])

  return (
    <Horario data={data} setData={setData} asignaturas={asignaturas} setAsignaturas={setAsignaturas}
      user={user} userRedux={userRedux} dontDrag={dontDrag} selected={selected} verTope={verTope}
      tope={tope} niveles={niveles} nivel={nivel} setNivel={setNivel}
    />
  )
}

export default GetDataHorario
