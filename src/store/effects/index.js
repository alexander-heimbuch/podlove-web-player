import mediaEffectsFactory from './media'
import storageEffectsFactory from './storage'
import keyboardEffectsFactory from './keyboard'
import idleEffects from './idle'

import storage from 'utils/storage'
import keyhandler from 'utils/keyboard'

import mediaPlayer from '../../media-player'

const mediaEffects = mediaEffectsFactory(mediaPlayer)
const storageEffects = storageEffectsFactory(storage)
const keyboardEffects = keyboardEffectsFactory(keyhandler)

export default store => {
  keyboardEffects(store)

  return next => action => {
    next(action)
    storageEffects(store, action)
    mediaEffects(store, action)
    idleEffects(store, action)
  }
}
