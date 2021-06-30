export const handleDialogCarrera = (open, type, selectedCarrera) => {
  if (open) {
    return dispatch => dispatch(openDialogCarrera(type, selectedCarrera));
  }
  else {
    return dispatch => dispatch(closeDialogCarrera());
  }
}

const openDialogCarrera = (type, selectedCarrera) => ({
  type: 'openDialogCarrera',
  payload: {
    type: type,
    selectedCarrera: selectedCarrera
  }
})

const closeDialogCarrera = () => ({
  type: 'closeDialogCarrera',
  payload: {}
})
