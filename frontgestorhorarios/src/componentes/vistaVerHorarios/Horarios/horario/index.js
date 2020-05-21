import React, { useState, useCallback, useEffect } from 'react';

import { useParams} from "react-router";

import clientAxios from '../../../../config/axios';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Horario from './horario';

const colores = ['#F012BE', '	#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#FFDC00',
  '#FF851B', '#FF4136']

const getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
)

function GetDataHorario({nivel, user, currentProceso, userRedux, dontDrag, }) {

  const malla = useSelector(MallaSelector);

  const [data, setData] = useState([]);

  const [bloques, setBloques] = useState([]);

  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(()=>{
    clientAxios(user.idToken).get(`/api/asignatura/${malla.id}/${nivel}/${currentProceso.id}`)
    .then(res => {
      const data = res.data
      var asignaturas = data.map(asignatura=>({nombre_asignatura: asignatura.nombre_asignatura,
        cod_asignatura: asignatura.cod_asignatura, asignaturaId: asignatura.id}))
      setAsignaturas(asignaturas)
      var bloquesMatrix = data.map((asignatura, i)=>asignatura.coordinaciones.map(coordinacion=>{
        const color = getRandomColor();
        coordinacion.bloques.map(bloque=>{
          bloque.asignaturaId = asignatura.id
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
      }))
      var bloques = []
      bloquesMatrix.map(bloqueM=>bloques = bloques.concat(...bloqueM))
      setData(bloques)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[nivel, malla.id])

  return (
    <Horario data={data} setData={setData} asignaturas={asignaturas} setAsignaturas={setAsignaturas}
      user={user} userRedux={userRedux} dontDrag={dontDrag}/>
  )
}

export default GetDataHorario
