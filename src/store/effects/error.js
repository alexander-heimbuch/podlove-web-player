import actions from '../actions'

export default (store, action) => {
  switch (action.type) {
    case 'ERROR_LOAD':
      store.dispatch(actions.showError())
      break
  }
}
