export const handleDialogNuevoProceso = (open) => {
  if (open) {
    return dispatch => dispatch(openDialogNuevoProceso())
  }
  else {
    return dispatch => dispatch(closeDialogNuevoProceso())
  }
}

const openDialogNuevoProceso = () => ({
  type: 'openDialogNuevoProceso',
  payload: {}
})

const closeDialogNuevoProceso = () => ({
  type: 'closeDialogNuevoProceso',
  payload: {}
})
