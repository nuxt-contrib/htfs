const fetch = require('node-fetch')
const pMemoize = require('p-memoize')

module.exports = class HTTPFSClient {
  constructor ({ endpoint, maxAge = 1000 }) {
    this.endpoint = endpoint.replace(/\/$/, '')
    this._request = pMemoize(this._request, { maxAge })
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
    const res = await this._request(path)
    switch (res.status) {
      case 200: return true
      case 404: return false
      default: throw new Error('Invalid status ' + res.status)
    }
  }

  async readFile (path) {
    const res = await this._request(path)
    return res.text()
  }
}
