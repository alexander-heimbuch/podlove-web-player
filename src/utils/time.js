import { isNumber } from 'lodash'
import { compose } from 'lodash/fp'

import { toInt, toFloat } from './helper'

const timeRegex = new RegExp(/^(?:(\d{1,2}):)?(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/)

// Parses hours from hh:mm:ss, hh:mm and mm
export const parseHours = (time = '0') => {
  const partials = time.split(':')
  let hours, rest // eslint-disable-line

  if (partials.length < 3) {
    return 0
  }

  [hours, ...rest] = partials // eslint-disable-line
  return toInt(hours)
}

export const parseMinutes = (time = '0') => {
  let minutes, hours, seconds // eslint-disable-line

  const partials = time.split(':')

  switch (partials.length) {
    case 3:
      [hours, minutes, seconds] = partials
      break

    case 2:
      [minutes, seconds] = partials
      break

    default:
      minutes = '0'
  }

  return toInt(minutes)
}

export const parseSeconds = (time = '0') => {
  let minutes, hours, seconds // eslint-disable-line

  const partials = time.split(':')

  switch (partials.length) {
    case 3:
      [hours, minutes, seconds] = partials
      break

    case 2:
      [minutes, seconds] = partials
      break

    case 1:
      [seconds] = partials
      break

    default:
      seconds = '0'
  }

  return toInt(seconds)
}

export const parseMilliseconds = (time = '0') => {
  let minutes, hours, seconds, milliseconds // eslint-disable-line

  const partials = time.split(':')

  switch (partials.length) {
    case 3:
      [hours, minutes, seconds] = partials
      break

    case 2:
      [minutes, seconds] = partials
      break

    case 1:
      [seconds] = partials
      break

    default:
      seconds = '0'
  }

  const subpartial = seconds.split('.')

  if (subpartial.length > 1) {
    [seconds, milliseconds] = subpartial
  } else {
    milliseconds = '0'
  }

  return toInt(milliseconds)
}

// Transforms a h:mm:ss.f or mm:ss.ffff or ss time to milliseconds
export const toPlayerTime = (time = '0') => {
  if (isNumber(time)) {
    return time
  }

  const matches = timeRegex.exec(time || '0')

  const hours = parseHours(time) * 60 * 60 * 1000
  const minutes = parseMinutes(time) * 60 * 1000
  const seconds = parseSeconds(time) * 1000
  const milliseconds = parseMilliseconds(time)

  const hours = matches[2] ? matches[1] : 0

  return hours + minutes + seconds + milliseconds
}

export const calcSeconds = (time = 0) => parseInt(time % 60)
export const calcMinutes = (time = 0) => parseInt(time / 60) % 60
export const calcHours = (time = 0) => parseInt(time / 3600) % 24

export const localeDate = (timestamp, locale) => new Date(timestamp).toLocaleDateString(locale)
export const localeTime = (timestamp, locale) => new Date(timestamp).toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'})

const leadingZero = time => time > 9 ? `${time}` : `0${time}`

// Transforms milliseconds to (hh:)mm:ss
export const fromPlayerTime = (time = 0) => {
  time = time < 0 ? 0 : time / 1000

  let hours = compose(calcHours, toInt)(time)
  let minutes = compose(calcMinutes, toInt)(time)
  let seconds = compose(calcSeconds, toInt)(time)

  let result = `${leadingZero(minutes)}:${leadingZero(seconds)}`

  if (hours > 0) {
    result = `${hours}:${result}`
  }

  return result
}

export const secondsToMilliseconds = compose(toInt, input => input * 1000, toFloat)
export const millisecondsToSeconds = compose(toFloat, input => input / 1000, toInt)
export const parseDate = (utcDate) => utcDate ? new Date(utcDate).getTime() : null
