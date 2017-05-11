const INITIAL = {
    visible: false,
    message: null,
    title: null
}

const error = (state = INITIAL, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                title: action.payload.title,
                message: action.payload.message
            }
        case 'SHOW_ERROR':
            return {
                ...state,
                visible: true
            }
        case 'HIDE_ERROR':
            return {
                ...state,
                visible: false
            }
        default:
            return state
    }
}

export {
    error
}