const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
})

// 새 유저 생성
User.statics.create = function(username, password) {
  const user = new this({
    username,
    password
  })

  // return the Promise
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
  return this.password === password
}

// 유저를 관리자 계정으로 설정
User.methods.assignAdmin = function() {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('User', User)