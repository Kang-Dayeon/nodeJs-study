require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const { PORT, MONGO_URI } = process.env

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 몽구스 연결
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => {console.log(err)})

app.get("/", (req, res) => res.send("Hello world"))

app.listen(PORT, () => console.log(`${PORT}포트입니다.`))

