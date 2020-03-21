import React, {useState} from 'react';

import clientAxios from '../../../../config/axios'

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

// import AsignarAsignatura from '../asignarAsignatura'
import CoordinacionForm from './coordinacionForm/coordinacionForm'
import AsociarCoord from './asociarCoord'

const EleccionCoord = ({nombre_asignatura, asignatura, lab_independiente, estado, setEstado,
  crear, setCrear, }) =>{

  const [eleccion, setEleccion] = useState(0)

  const eleccion1 = () =>{
    setEleccion(1)
  }

  const eleccion2 = () =>{
    setEleccion(2)
  }

  const data = {
    cod_coord: '',
    nombre_coord: nombre_asignatura,
    tipo_coord: '',
  }

  function handleClick(e){
    e.preventDefault()
    setCrear(true)
  }

  function onSubmitForm(state){
    const num_bloques = function(){
      if(lab_independiente){
        switch (state.tipo_coord.value) {
          case "Teoría":
            return asignatura.tel_T/2
          case "Ejercicios":
            return asignatura.tel_E/2
          case "Laboratorio":
            return asignatura.tel_L/2
          default:
            return 0
        }
      }
      else{
        return (asignatura.tel_T + asignatura.tel_E + asignatura.tel_L)/2
      }
    }
    const data = {
      cod_coord: state.cod_coord.value,
      nombre_coord: state.nombre_coord.value,
      tipo_coord: state.tipo_coord.value,
      asignaturaId: asignatura.id,
      num_bloques: num_bloques()
    }
    console.log(data);
    clientAxios().post('/api/coordinacion', data)
    .then(res => {
      console.log('hola');
      console.log(res.data);
      setCrear(false)
      setEstado(!estado)
    })
  }

  if (eleccion === 1) {
    return(
      <CoordinacionForm camposCord={data} onSubmitForm={onSubmitForm}
        estado={estado} setEstado={setEstado}/>
    )
  }
  else if (eleccion === 2) {
    return(
      <>
        <AsociarCoord asignaturaAct={asignatura} estado={estado} setEstado={setEstado}/>
      </>
    )
  }
  else {
    return(
      <DialogContent>
        <Button onClick={eleccion1} variant="contained" color="primary">
          Nueva Coordinacion
        </Button>
        <br />
        <Button onClick={eleccion2} variant="contained" color="primary">
          Agregar Coordinacion Existente
        </Button>
      </DialogContent>
    )
  }
}
export default EleccionCoord
