import React, { useState, useCallback, useEffect } from 'react';

import { useParams} from "react-router";

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import clientAxios from '../../../config/axios';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setLoading, } from '../../../redux/actions';
import _ from 'lodash'

import Horario from '../Horarios/horario/horario';

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

const UserSelector = createSelector(
  state => state.user,
  user => user.user
);

const getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

const HorarioProfesor = ({selectedUser, }) => {

  const dispatch = useDispatch();

  const user = useSelector(UserSelector);
  const proceso = useSelector(ProcesoSelector);

  const [data, setData] = useState([]);

  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(()=>{
    clientAxios(user.idToken).get(`/api/getHorario/${selectedUser ? 'selectedUser' : user.id}/${proceso.id}`)
    .then(res => {
      const data = res.data
      console.log(data);
      // var asignaturas = data.map(asignatura=>({nombre_asignatura: asignatura.nombre_asignatura,
      //   cod_asignatura: asignatura.cod_asignatura, asignaturaId: asignatura.asignaturaId}))
      // const UniqueAsignaturas = _.uniqWith(asignaturas, _.isEqual);
      // setAsignaturas(UniqueAsignaturas)
      // console.log(asignaturas);
      let AsignaturasConBloques = [];
      var bloquesMatrix = data.map((asignatura, i)=>{
        asignatura.Asignatura.coordinaciones.length > 0 && AsignaturasConBloques.push({
          nombre_asignatura: asignatura.nombre_asignatura,
          cod_asignatura: asignatura.cod_asignatura,
          asignaturaId: asignatura.asignaturaId
        })
        return asignatura.Asignatura.coordinaciones.map(coordinacion=>{
          const color = getRandomColor();
          coordinacion.bloques.map(bloque=>{
            bloque.asignaturaId = asignatura.asignaturaId
            bloque.profesores = coordinacion.profesores
            bloque.cod_asignatura = asignatura.cod_asignatura
            bloque.nombre_coord = coordinacion.InfoCoordinacion.nombre_coord
            bloque.cod_coord = coordinacion.InfoCoordinacion.cod_coord
            bloque.mostrar = true
            bloque.size = 1
            bloque.color = color
            return bloque
          })
          return coordinacion.bloques
        })
      })
      console.log(AsignaturasConBloques);
      const UniqueAsignaturas = _.uniqWith(AsignaturasConBloques, _.isEqual);
      setAsignaturas(UniqueAsignaturas)
      var bloques = []
      bloquesMatrix.map(bloqueM=>bloques = bloques.concat(...bloqueM))
      console.log(bloques);
      const UniqueBloques = Array.from(new Set(bloques.map(bloque => bloque.id)))
        .map(id => bloques.find(bloque => bloque.id === id))
      setData(UniqueBloques)
      dispatch(setLoading(false));
    })
    .catch((error)=>{
      console.log(error);
    })
  },[proceso.id])

  return (
    <DndProvider backend={HTML5Backend}>
      <Horario data={data} setData={setData} asignaturas={asignaturas} setAsignaturas={setAsignaturas}
        user={user}/>
    </DndProvider>
  )
}

export default HorarioProfesor
