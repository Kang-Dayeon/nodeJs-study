const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./config')
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

// 화면 엔진 ejs로 설정
app.set('views', './views')
app.set('views engine', 'ejs')

app.set('jwt-secret', config.secret)

// index.ejs실행
app.get('/', (req, res) => {
  res.render('index.ejs', {
    tit: 'Nodejs login 기능 구현'
  })
})

// 회원가입 페이지로 이동
app.get('/signUp', (req, res) => {
  res.render('./signUp/index.ejs', {
    tit: 'Nodejs 회원가입 기능 구현'
  })
})

app.use('/api', require('./routes/api'))

app.listen(port, () => {
  console.log(`express is running on port ${port}`)
})

mongoose.connect(config.mongodbUri, {
  tlsAllowInvalidHostnames: true,
  tlsAllowInvalidCertificates: true,
})
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('connected to mongodb server')
})