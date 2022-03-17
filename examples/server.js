const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const path = require('path')
const atob = require('atob')

const app = express()
require('./server2.js')
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))
const router = express.Router()
router.get('/simple/get', function (req, res) {
  res.json({
    msg: '你好, ts~'
  })
})
router.get('/base/get', function (req, res) {
  res.json(req.query)
})

router.post('/base/post', function (req, res) {
  res.json(req.body)
})
router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', function (chunk) {
    msg.push(chunk)
  })
  req.on('end', function () {
    res.json(Buffer.concat(msg).toJSON())
  })
})

router.get('/error/get', function (req, res) {
  if (Math.random() > 0.5) {
    res.json({ msg: '你好幸运~' })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/get1', function (req, res) {
  res.json({ msg: '网络错误' })
})
router.get('/error/timeout/get', function (req, res) {
  setTimeout(function () {
    res.json({
      msg: '好像超时了~'
    })
  }, 3000)
})

router.get('/extend/get', function (req, res) {
  res.json({
    msg: '来啦~'
  })

})

router.post('/extend/post', function (req, res) {
  res.json({
    msg: '来啦~'
  })

})


router.get('/extend/user', function (req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

router.get('/interceptor/get', function (req, res) {
  res.end('zf')
})


router.post('/config1/post', function (req, res) {
  res.end('zf')
})

router.post('/transform/post', function (req, res) {
  res.json({
    a: 111
  })
})
router.post('/create1/post', function (req, res) {
  res.json({
    a: 111
  })
})
router.get('/cancel/get', function (req, res) {
  setTimeout(() => {
    res.json({
      a: 111
    })
  }, 2000)
})

router.get('/more/get', function (req, res) {
  res.json(req.cookies)
})
router.post('/more/upload', function (req, res) {
  res.end('upload success!')
})
router.post('/more/post', function (req, res) {
  let auth = req.headers.authorization
  let [basic, credentials] = auth.split(' ')
  console.log(basic, credentials)

  let [name, psd] = atob(credentials).split(':')
  console.log(name, psd)
  if (basic === 'Basic' && name === 'zf' && psd === '888888') {
    res.json({
      name,
      psd
    })
  } else {
    res.end('UnAuthorization')
  }
})
router.get('/validata/get1', (req, res) => {
  res.status(304)
  res.end()
})
app.use(router)

const port = process.env.PORT || 8081

module.exports = app.listen(port, () => {
  console.log(`你的examples启动在：http://localhost:${port}, 使用Ctrl+c 停止服务`)
})