import React from 'react';

import {TableBody, } from '@material-ui/core';

import TablaCarrerasRow from './tablaCarrerasRow';

const TablaCarrerasBody = ({carreras, }) => {

  return (
    <TableBody>
      {carreras.map((carrera) => (
        <TablaCarrerasRow carrera={carrera} />
      ))}
    </TableBody>
  )
}

export default TablaCarrerasBody;
