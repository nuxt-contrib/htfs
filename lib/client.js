const fetch = require('node-fetch')

module.exports = class HTTPFSClient {
  constructor (options = {}) {
    if (!options.endpoint) {
      throw new Error('Missing required option `endpoint`')
    }
    this.endpoint = options.endpoint.replace(/\/$/, '')
  }

  _url (path) {
    return this.endpoint + path
  }

  async _request (path, options) {
    const url = this._url(path)
    const res = await fetch(url, options)
    return res
  }

  async exists (path) {
    const res = await this._request(path, { method: 'HEAD' })
    switch (res.status) {
      case 200: return true
      case 404: return false
      default: throw new Error('Unexpected status ' + res.status)
    }
  }

  async readFile (path) {
    const res = await this._request(path)
    return res.text()
  }
}
