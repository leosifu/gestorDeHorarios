import React from 'react';

import Swal from 'sweetalert2';

const AlertUnauthorized = () => {
  console.log('asdas');
  Swal.fire({
    title: 'No hay autorización para realizar esta acción',
    confirmButtonColor: '#000',
    confirmButtonText: 'Aceptar'
  })
}

export default AlertUnauthorized;
