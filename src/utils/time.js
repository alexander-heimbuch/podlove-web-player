import { isNumber } from 'lodash'
import { compose } from 'lodash/fp'

import { toInt, toFloat } from './helper'

const timeRegex = new RegExp(/^(?:(\d{1,2}):)?(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/)

// Transforms a h:mm:ss.f or mm:ss.ffff or ss time to milliseconds
export const toPlayerTime = (time = '0') => {
  if (isNumber(time)) {
    return time
  }

  const matches = timeRegex.exec(time || '0')

  console.log(matches)

  const hours = parseInt(matches[2] ? matches[1] : 0)
  const minutes = parseInt(matches[2] ? matches[2] : (matches[1] || 0))
  const seconds = parseInt(matches[3] || 0)
  const milliseconds = parseInt(matches[4] || 0)

  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds
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
