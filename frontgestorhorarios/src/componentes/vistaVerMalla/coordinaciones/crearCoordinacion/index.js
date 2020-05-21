import React, {useState} from 'react';

import clientAxios from '../../../../config/axios'

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

// import AsignarAsignatura from '../asignarAsignatura'
import CoordinacionForm from './coordinacionForm/coordinacionForm'
import AsociarCoord from './asociarCoord'

const EleccionCoord = ({nombre_asignatura, asignatura, lab_independiente, estado, setEstado,
  crear, setCrear, user, currentProceso, }) =>{

  const [eleccion, setEleccion] = useState(0);
  const [profesoresSelect, setProfesoresSelect] = useState([]);

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
    num_bloques: 0
  }

  function handleClick(e){
    e.preventDefault()
    setCrear(true)
  }

  function onSubmitForm(state){
    const data = {
      cod_coord: state.cod_coord.value,
      nombre_coord: state.nombre_coord.value,
      tipo_coord: state.tipo_coord.value,
      asignaturaId: asignatura.id,
      num_bloques: state.num_bloques.value,
      profesores: profesoresSelect
    }
    console.log(data);
    clientAxios(user.idToken).post('/api/coordinacion', data)
    .then(res => {
      setCrear(false)
      setEstado(!estado)
    })
    .catch(error => {
      console.log(error);
    })
  }

  if (eleccion === 1) {
    return(
      <CoordinacionForm camposCord={data} onSubmitForm={onSubmitForm} setEstado={setEstado}
        estado={estado} profesoresSelect={profesoresSelect} user={user}
        setProfesoresSelect={setProfesoresSelect} currentProceso={currentProceso}/>
    )
  }
  else if (eleccion === 2) {
    return(
      <AsociarCoord asignaturaAct={asignatura} estado={estado} setEstado={setEstado} user={user}
        currentProceso={currentProceso}/>
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
