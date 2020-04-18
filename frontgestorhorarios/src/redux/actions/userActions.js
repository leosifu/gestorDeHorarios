export const handleLoginUser = (user) => {
  if (user) {
    return dispatch => dispatch(loginUser(user))
  }
}

const loginUser = (user) => ({
  type: 'loginUser',
  payload: user
})

export const handleLogoutUser = () => {
  return dispatch => dispatch(logoutUser())
}

const logoutUser = () => ({
  type: 'logoutUser',
  payload: {}
})
