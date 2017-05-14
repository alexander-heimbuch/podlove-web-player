const errorLoad = (title, message) => ({
  type: 'ERROR_LOAD',
  payload: {
    title: 'ERROR.LOADING.TITLE',
    message: 'ERROR.LOADING.MESSAGE'
  }
})

const showError = () => ({
  type: 'SHOW_ERROR'
})

const hideError = () => ({
  type: 'HIDE_ERROR'
})

export { errorLoad, showError, hideError }
