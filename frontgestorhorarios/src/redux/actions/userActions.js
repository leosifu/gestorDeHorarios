export const handleLoginUser = (user) => {
  if (user) {
    return dispatch => {
      dispatch(userLoading())
      dispatch(loginUser(user))
      dispatch(userNotLoading())
    }
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

export const handleLoginFailed = () => {
  return dispatch => {
    dispatch(userLoading())
    dispatch(loginFailed())
    dispatch(userNotLoading())
  }
}

const loginFailed = () => ({
  type: 'loginFailed',
  payload: {}
})

export const setUserLoading = (loading) => {
  if (loading) {
    return dispatch => dispatch(userLoading())
  }
  else {
    return dispatch => dispatch(userNotLoading())
  }
}

const userLoading = () => ({
  type: 'userLoading',
  payload: true
})

const userNotLoading = () => ({
  type: 'userNotLoading',
  payload: false
})
