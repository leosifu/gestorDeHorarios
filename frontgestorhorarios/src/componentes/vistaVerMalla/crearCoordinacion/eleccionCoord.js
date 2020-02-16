import React, {useState} from 'react';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

import CoordinacionForm from './coordinacionForm'
import AsociarCoord from './asociarCoord'

const EleccionCoord = ({coordinacion}) =>{

  const [eleccion, setEleccion] = useState(0)

  const eleccion1 = () =>{
    setEleccion(1)
  }

  const eleccion2 = () =>{
    setEleccion(2)
  }

  function onSubmitForm(state) {
    const data = {
      cod_asignatura: state.cod_asignatura.value,
      nombre_asignatura: state.nombre_asignatura.value,
      tel_T: parseInt(state.tel_T.value),
      tel_E: parseInt(state.tel_E.value),
      tel_L: parseInt(state.tel_L.value),
      nivel: nivel,
      lab_independiente: state.lab_independiente.checked,
      mallaId: mallaId.mallaId,
      historial: {
        cupos_pasados: state.cupos_pasados.value,
        tasa_reprobacion: state.tasa_reprobacion.value,
      }
    }
    console.log(data);
    axios.post('http://localhost:8000/api/asignatura', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })
  }

  var camposAsignatura = {
    cod_asignatura: '',
    nombre_asignatura: '',
    descripcion: '',
    tel_T: 0,
    tel_E: 0,
    tel_L: 0,
    cupos_pasados: 0,
    tasa_reprobacion: 0,
    lab_independiente: false,
  }

  if (eleccion === 1) {
    return(
      <CoordinacionForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm} tipo={0}
        estado={estado} setEstado={setEstado}/>
    )
  }
  else if (eleccion === 2) {
    return(
      <AsignCoord coordinacion/>
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
