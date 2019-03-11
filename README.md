# HTTP Filesystem

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-dt-src]][npm-dt-href]
[![package phobia][packagephobia-src]][packagephobia-href]

[![Standard JS][standard-src]][standard-href]
[![david dm][david-src]][david-href]
[![codecov][codecov-src]][codecov-href]
[![circleci][circleci-src]][circleci-href]

Expose filesystem via HTTP and access it from the other side!

This module works best with [memory-fs](https://github.com/webpack/memory-fs).

## Install

Install package:

```bash
yarn add htfs
```

OR

```bash
npm install htfs
```

## Server

Serving real fs is not a good idea. In this example we serve a virtual filesystem.

```js
const HTTPFSMiddleware = require('htfs/lib/middleware')
const express = require('express')
const MFS = require('memory-fs')

// Create a new express app listening on port 8080
const app = express()
app.listen(8080)

// Create a new Virtual FileSystem with a test file
const mfs = new MFS()
mfs.mkdirpSync('/test')
mfs.writeFileSync('/test/file.txt', 'Works!')

// Create and register fs middleware
app.use('/mfs', HTTPFSMiddleware(mfs))
```

You can now browse filesystem with broweser: http://localhost:8080/mfs/

## Client

Supported methods:

- `exists(path): Promise<Boolean>`
- `readFile(path): Promise<String>`

```js
const HTTPFSAClient = require('htfs/lib/client')

const fs = new HTTPFSAClient({
  endpoint: 'http://localhost:8080/mfs'
})

fs.readFile('/test/file.txt').then((contents) => {
  console.log('File contents:', contents)
})
```

### Options

#### `endpoint`

Required. HTTP URL of server.

## License

MIT. Made with 💖

<!-- Refs -->
[standard-src]: https://flat.badgen.net/badge/code%20style/standard/green
[standard-href]: https://standardjs.com

[npm-v-src]: https://flat.badgen.net/npm/v/htfs/latest
[npm-v-href]: https://npmjs.com/package/htfs

[npm-dt-src]: https://flat.badgen.net/npm/dt/htfs
[npm-dt-href]: https://npmjs.com/package/htfs

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/htfs
[packagephobia-href]: https://packagephobia.now.sh/result?p=htfs

[david-src]: https://flat.badgen.net/david/dep/jsless/htfs
[david-href]: https://david-dm.org/jsless/htfs

[codecov-src]: https://flat.badgen.net/codecov/c/github/jsless/htfs/master
[codecov-href]: https://codecov.io/gh/jsless/htfs

[circleci-src]: https://flat.badgen.net/circleci/github/jsless/htfs/master
[circleci-href]: https://circleci.com/gh/jsless/htfs
