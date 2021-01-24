import React from 'react'

import TextField from '../../../../utils/TextField';

const DatosCoordForm = ({handleOnChange, cod_coord, nombre_coord, }) => {

  return(
    <>
      <TextField
        error = {cod_coord.error ? true : false}
        id="cod_coord"
        label="Código de la coordinación"
        name="cod_coord"
        style={{width: '45%'}}
        value={cod_coord.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        error = {nombre_coord.error ? true : false}
        id="nombre_coord"
        label="Nombre de la coordinación"
        name="nombre_coord"
        style={{width: '45%'}}
        value={nombre_coord.value}
        onChange={handleOnChange}
        margin="normal"
        variant="outlined"
      />
    </>
  )
}
export default DatosCoordForm
