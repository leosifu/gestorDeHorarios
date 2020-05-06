export const handleDialogCreate = (open) => {
  if (open) {
    return dispatch => dispatch(openDialogCreate())
  }
  else {
    return dispatch => dispatch(closeDialogCreate())
  }
}

const openDialogCreate = () => ({
  type: 'openDialogCreateUsuario',
  payload: {}
})

const closeDialogCreate = () => ({
  type: 'closeDialogCreateUsuario',
  payload: {}
})

export const handleDialogEdit = (open, user) => {
  if (open) {
    console.log(user);
    return dispatch => dispatch(openDialogEdit(user))
  }
  else {
    return dispatch => dispatch(closeDialogEdit())
  }
}

const openDialogEdit = (user) => ({
  type: 'openDialogEditUsuario',
  payload: user
})

const closeDialogEdit = () => ({
  type: 'closeDialogEditUsuario',
  payload: {}
})
