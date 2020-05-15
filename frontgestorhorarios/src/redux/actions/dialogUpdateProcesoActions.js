export const handleDialogUpdateProceso = (open) => {
  if (open) {
    return dispatch => dispatch(openDialogCreate())
  }
  else {
    return dispatch => dispatch(closeDialogCreate())
  }
}

const openDialogCreate = () => ({
  type: 'openDialogUpdateProceso',
  payload: {}
})

const closeDialogCreate = () => ({
  type: 'closeDialogUpdateProceso',
  payload: {}
})
