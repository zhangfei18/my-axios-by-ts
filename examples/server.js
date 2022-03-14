const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')


console.log('webpackConfig', webpackConfig)

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
router.get('/simple/get', function (req, res) {
  res.json({
    msg: '你好, ts~'
  })
})
app.use(router)

const port = process.env.PORT || 8081

module.exports = app.listen(port, () => {
  console.log(`你的examples启动在：http://localhost:${port}, 使用Ctrl+c 停止服务`)
})