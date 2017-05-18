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
      store.userID = response.user.id
      store.userEmail = response.user.email
    })
}

const logout = function (data) {
  console.log('data is ' + data)
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/sign-out/' + store.userID,
    method: 'DELETE'
  })
    .then(function () {
      store.userToken = undefined
      store.userID = undefined
    })
}

const changePassword = function (data) {
  console.log('data is ' + data)
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/change-password/' + store.userID,
    method: 'PATCH',
    data
  })
}

module.exports = {
  signUp,
  signIn,
  logout,
  changePassword
}
