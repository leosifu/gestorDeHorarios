export const handleDialogTopes = (open, data) => {
  if (open) {
    return dispatch => dispatch(openDialogTopes(data))
  }
  else {
    return dispatch => dispatch(closeDialogTopes())
  }
}

const openDialogTopes = (data) => ({
  type: 'openDialogTopes',
  payload: data
})

const closeDialogTopes = () => ({
  type: 'closeDialogTopes',
  payload: {}
})
