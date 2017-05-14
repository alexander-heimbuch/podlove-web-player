import actions from '../actions'

export default (store, action) => {
    if (action.type !== 'SET_ERROR') {
        return
    }

    switch (action.errorType) {
        case 'LOAD_ERROR':
            store.dispatch(actions.showError())
        break
    }
}
