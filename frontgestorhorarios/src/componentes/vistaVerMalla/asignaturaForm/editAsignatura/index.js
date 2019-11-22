import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import AsignaturaForm from '../asignaturaForm'

function EditAsignatura({infoAsignatura, asignatura, mallaId, setEdit, estado, setEstado}){

  console.log(asignatura);

  function onSubmitForm(state) {
    const data = {
      cod_asignatura: state.cod_asignatura.value,
      nombre_asignatura: state.nombre_asignatura.value,
      tel_T: parseInt(state.tel_T.value),
      tel_E: parseInt(state.tel_E.value),
      tel_L: parseInt(state.tel_L.value),
      lab_independiente: state.lab_independiente.checked,
      mallaId: mallaId.mallaId,
      historial: {
        cupos_pasados: state.cupos_pasados.value,
        tasa_reprobacion: state.tasa_reprobacion.value,
      }
    }
    console.log(data);
    var link = 'http://localhost:8000/api/asignatura/' + asignatura.id
    console.log(link);
    axios.put(link, data)
    .then(res => {
      console.log(res.data);
      setEdit(false)
      setEstado(!estado)
    })
  }

  var camposAsignatura = {
    cod_asignatura: infoAsignatura.cod_asignatura,
    nombre_asignatura: infoAsignatura.nombre_asignatura,
    descripcion: '',
    tel_T: asignatura.tel_T,
    tel_E: asignatura.tel_E,
    tel_L: asignatura.tel_L,
    cupos_pasados: asignatura.historial.cupos_pasados,
    tasa_reprobacion: asignatura.historial.tasa_reprobacion,
    lab_independiente: asignatura.lab_independiente,
  }

  return (
    <React.Fragment>
      <AsignaturaForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm}/>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
    return {
        mallaId: state.mallaId
    }
}

export default connect(mapStateToProps)(EditAsignatura)