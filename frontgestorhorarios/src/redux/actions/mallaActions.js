export const setMallaRedux = (malla) => {
  return (dispatch) => dispatch(setMalla(malla))
}

const setMalla = (malla) => ({
  type: 'setMalla',
  payload: malla
})
