const HTTPFSAClient = require('../lib/client')

it('Throws without passing endpoint', () => {
  expect(() => new HTTPFSAClient()).toThrow('Missing required option `endpoint`')
})

it('Throws on unexpected status code', async () => {
  const client = new HTTPFSAClient({ endpoint: 'http://' })
  client._request = () => Promise.resolve({ status: 500 })
  await expect(client.exists('/')).rejects.toThrow('Unexpected status 500')
})
