export const handleRightBar = (open) => {
  if (open) {
    return dispatch => dispatch(openRightBar());
  }
  else {
    return dispatch => dispatch(closeRightBar());
  }
}

const openRightBar = () => ({
  type: 'openRightBar',
  payload: {}
})

const closeRightBar = () => ({
  type: 'closeRightBar',
  payload: {}
})
