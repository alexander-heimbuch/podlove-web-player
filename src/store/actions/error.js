const setError = (title, message) => ({
    action: 'SET_ERROR',
    payload: { title, message }
})

const showErroor = () => ({
    action: 'SHOW_ERROR'
})

const hideErroor = () => ({
    action: 'HIDE_ERROR'
})