export const handleDialogAsignatura = (open, data) => {
  if (open) {
    console.log(data);
    return dispatch => dispatch(openDialogAsignatura(data));
  }
  else {
    return dispatch => dispatch(closeDialogAsignatura());
  }
}

const openDialogAsignatura = (data) => ({
  type: 'openDialogAsignatura',
  payload: {
    data: data
  }
})

const closeDialogAsignatura = () => ({
  type: 'closeDialogAsignatura',
  payload: {}
})
