const util = require('util')
const Express = require('express')
const MFS = require('memory-fs')
const fetch = require('node-fetch')
const HTTPFSMiddleware = require('../lib/middleware')
const HTTPFSAClient = require('../lib/client')

let app, server, port, endpoint, client

// ------------------------------------
// Setup
// ------------------------------------
it('init server', async () => {
  const mfs = new MFS()
  mfs.mkdirpSync('/test')
  mfs.writeFileSync('/test/file.txt', 'Works!')

  app = Express()
  await new Promise((resolve, reject) => {
    server = app.listen(0, (err) => err ? reject(err) : resolve())
    server.close = util.promisify(server.close)
    port = server.address().port
  })

  app.use('/mfs', HTTPFSMiddleware(mfs))

  endpoint = `http://localhost:${port}/mfs/`
})

it('init client', async () => {
  client = new HTTPFSAClient({ endpoint })
})

afterAll(async () => {
  await server.close()
})

// ------------------------------------
// Server
// ------------------------------------

it('server listing /', async () => {
  const res = await fetch(endpoint)
  expect(res.status).toBe(200)
  expect(await res.text()).toContain('<h1>Index of /</h1>')
})

// ------------------------------------
// Client
// ------------------------------------

it('client exists /', async () => {
  expect(await client.exists('/')).toBe(true)
})

it('client not exists /404', async () => {
  expect(await client.exists('/404')).toBe(false)
})

it('client not implented', async () => {
  expect(() => client.existsSync()).toThrow()
})

it('client test file', async () => {
  const contents = await client.readFile('/test/file.txt')
  expect(contents).toBe('Works!')
})
