import get from 'lodash/get'

const languages = {
  en: require('lang/en.json'),
  de: require('lang/de.json')
}

export default function translate (path) {
  const lang = this.$select('runtime.lang')
  const languagePack = get(languages, lang, languages.en)

  return get(languagePack, path, '')
}
