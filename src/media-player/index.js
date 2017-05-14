import { Howl } from 'howler'
import get from 'lodash/get'

import buffer from './buffer'

/*
* Exposes Methods:
* - play
* - pause
* - seek
*/
let ticker

export default (audio = [], {
  setPlaytime,
  setBufferState,
  setDuration,
  onPlay,
  onPause,
  onStop,
  onLoad,
  onError
}) => {
  const player = new Howl({
    src: audio,
    html5: true,
    preload: false
  })

  let audioNode

  player.once('load', () => {
    // No api sugar for the audio node :/
    audioNode = get(player, ['_sounds', 0, '_node'])
    setDuration(player.duration())
  })

  player.on('play', onPlay)

  // Playtime
  player.on('play', () => {
    ticker = setInterval(() => {
      setPlaytime(player.seek())
      buffer(audioNode, setBufferState)
    }, 500)
  })

  player.on('pause', () => {
    clearInterval(ticker)
    onPause()
  })

  player.on('stop', () => {
    clearInterval(ticker)
    onStop()
  })

  // Error
  player.on('loaderror', () => {
    onError('ERROR.LOADING.TITLE', 'ERROR.LOADING.MESSAGE')
  })

  // Extend seek functionality to be capable of jumping in without loaded player
  player.setPlaytime = playtime => {
    if (player.state() === 'unloaded') {
      player.load()
    }

    player.seek(playtime)
  }

  // Howler doesn't have an "start loading" event, so this is a monkey patch :/
  // Maybe this could be a useful plugin
  const howlerPlay = player.play.bind(player)
  let initialPlay = false

  player.once('play', () => {
    initialPlay = true
  })

  player.play = (sprite, internal) => {
    if (!initialPlay) {
      onLoad()
    }

    howlerPlay(sprite, internal)
  }

  return player
}
