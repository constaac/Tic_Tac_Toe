'use strict'

const config = require('../config.js')

const signUp = function (data) {
  console.log('data is ' + data)
  return $.ajax({
    url: config.apiOrigins.production + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}
