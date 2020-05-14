export const handleDialogHorarioProfesor = (open, selectedUser) => {
  if (open) {
    console.log(selectedUser);
    return dispatch => dispatch(openDialogCreate(selectedUser))
  }
  else {
    return dispatch => dispatch(closeDialogCreate())
  }
}

const openDialogCreate = (selectedUser) => ({
  type: 'openDialogHorarioProfesor',
  payload: selectedUser
})

const closeDialogCreate = () => ({
  type: 'closeDialogHorarioProfesor',
  payload: {}
})
