const setError = (title, message, errorType) => ({
    type: 'SET_ERROR',
    errorType,
    payload: { title, message }
})

const showError = () => ({
    type: 'SHOW_ERROR'
})

const hideError = () => ({
    type: 'HIDE_ERROR'
})

export {
    setError,
    showError,
    hideError
}