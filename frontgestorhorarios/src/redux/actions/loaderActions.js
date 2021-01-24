export const setLoading = (loading) => {
  if (loading) {
    return (dispatch) => dispatch(startLoading(loading))
  }
  else {
    return (dispatch) => dispatch(finishLoading(loading))
  }
}

const startLoading = (loading) => ({
  type: 'startLoading',
  payload: loading
})

const finishLoading = (loading) => ({
  type: 'finishLoading',
  payload: loading
})
