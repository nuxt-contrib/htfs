# 🇭TTP 🇫ilesystem

[![Standard JS][standard-src]][standard-href]
[![david dm][david-src]][david-href]
[![codecov][codecov-src]][codecov-href]
[![circleci][circleci-src]][circleci-href]

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-dt-src]][npm-dt-href]
[![package phobia][packagephobia-src]][packagephobia-href]

### **NOTE** This module is under development and not ready for any production use!

Expose filesystem via HTTP and access it from the other side!

This module works best with [memory-fs](https://github.com/webpack/memory-fs).

## Install

Install package:

```bash
yarn add httpfs
```

OR

```bash
npm install httpfs
```

## Server

Serving real fs is not a good idea. In this example we serve a virtual filesystem.

```js
const HTTPFSMiddleware = require('httpfs/lib/middleware')
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

You can now browse filesystem via a normal browser via http://localhost:8080/mfs/

## Client

Supported methods:

- `exists(path): Promise<Boolean>`
- `readFile(path): Promise<String>`

```js
const HTTPFSAClient = require('httpfs/lib/client')

const fs = new HTTPFSAClient({
  endpoint: 'http://localhost:8080/mfs'
})

fs.readFile('/test/file.txt').then((contents) => {
  console.log('File contents:', contents)
})
```

### Options

- `endpoint`: HTTP Endpoint of server
- `maxAge`: Time for cache

## License

MIT. Made with 💖

<!-- Refs -->
[standard-src]: https://flat.badgen.net/badge/code%20style/standard/green
[standard-href]: https://standardjs.com

[npm-v-src]: https://flat.badgen.net/npm/v/httpfs/latest
[npm-v-href]: https://npmjs.com/package/httpfs

[npm-dt-src]: https://flat.badgen.net/npm/dt/httpfs
[npm-dt-href]: https://npmjs.com/package/httpfs

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/httpfs
[packagephobia-href]: https://packagephobia.now.sh/result?p=httpfs

[david-src]: https://flat.badgen.net/david/dep/jsless/httpfs
[david-href]: https://david-dm.org/jsless/httpfs

[codecov-src]: https://flat.badgen.net/codecov/c/github/jsless/httpfs/master
[codecov-href]: https://codecov.io/gh/jsless/httpfs

[circleci-src]: https://flat.badgen.net/circleci/github/jsless/httpfs/master
[circleci-href]: https://circleci.com/gh/jsless/httpfs
