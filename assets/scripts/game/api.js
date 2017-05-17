'use strict'

const config = require('../config.js')
const store = require('../store')

const createGame = function () {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/games',
    method: 'POST'
  })
}

module.exports = {
  createGame
}
