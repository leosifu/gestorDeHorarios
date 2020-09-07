export const handleNotifications = (open, data) => {
  if (open) {
    return dispatch => dispatch(openNotification(data))
  }
  else {
    return dispatch => dispatch(closeNotification())
  }
}

const openNotification = (data) => ({
  type: 'openNotification',
  payload: data
})

const closeNotification = () => ({
  type: 'closeNotification',
  payload: {}
})
