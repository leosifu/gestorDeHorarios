export const handleDialogInfoCoordinacion = (open, coordinacion) => {
  if (open) {
    return dispatch => dispatch(openDialogCreate(coordinacion))
  }
  else {
    return dispatch => dispatch(closeDialogCreate())
  }
}

const openDialogCreate = (coordinacion) => ({
  type: 'openDialogInfoCoordinacion',
  payload: coordinacion
})

const closeDialogCreate = () => ({
  type: 'closeDialogInfoCoordinacion',
  payload: {}
})
