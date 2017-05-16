'use strict'

const config = require('../config.js')
const store = require('../store')

const signUp = function (data) {
  console.log('data is ' + data)
  return $.ajax({
    url: config.apiOrigins.production + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  console.log('data is ' + data)
  return $.ajax({
    url: config.apiOrigins.production + '/sign-in',
    method: 'POST',
    data
  })
    .then((response) => {
      store.userToken = response.user.token
      store.userEmail = response.user.id
      store.userID = response.user.email
    })
}

module.exports = {
  signUp,
  signIn
}
