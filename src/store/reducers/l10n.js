import { get } from 'lodash/get'

const languages = {
  en: require('lang/en.json')
}

const l10n = (state = languages.en, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return get(languages, action.payload, state)
    default:
      return state
  }
}

export {
  l10n
}
