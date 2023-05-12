const mongoose = require('mongoose')
const Schema = mongoose.Schema
// crypto : js에서 해시 함수를 통한 암호화를 할 수 있도록 해주는 node.js 내장 모듈 => 여러가지 정보(ex: password)를 안전하게 암호화 할 수 있음
const crypto = require('crypto')
const config = require('../config')

// 유저 스키마 작성 : db에 저장될 데이터 종류와 타입을 정의한다
const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
})

// 새 유저 생성
User.statics.create = function(username, password) {
  // 비밀번호에 사용한 알고리즘은 해싱 알고리즘으로 단방향으로 암호화만 가능하고 복호화 할 수 없다.
  const encrypted = crypto.createHmac('sha1', config.secret)
                    .update(password) // 선택된 알고리즘으로 해싱
                    .digest('base64') // 표시할 인코딩 설정

  const user = new this({
    username,
    password: encrypted
  })

//  return the Promise
  return user.save()
}

// username값을 사용하여 유저 찾기
User.statics.findOneByUsername = function(username) {
  return this.findOne({
    username
  }).exec()
}


// verify 메소드는 비밀번호가 정확한지 확인
User.methods.verify = function(password) {
  const encrypted = crypto.createHmac('cha1', config.secret)
                    .update(password)
                    .digest('base64')

  return this.password === encrypted
}

// 유저를 관리자 계정으로 설정
User.methods.assignAdmin = function() {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('User', User)