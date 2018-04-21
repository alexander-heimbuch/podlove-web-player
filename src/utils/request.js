import request from 'superagent'

export default url =>
  (typeof url === 'string'
    ? request
      .get(url)
      .query({ format: 'json' })
      .set('Accept', 'application/json')
      .then(res => res.body)
      .then(res => typeof res === 'object' ? res : Promise.reject(new Error('no json response')))
    : new Promise(resolve => resolve(url)))
