'use strict'

const config = require('../config.js')
const store = require('../store')
const gamelogic = require('./gamelogic')

const createGame = function () {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/games',
    method: 'POST'
  })
}

const gameHistory = function (x) {
  if (x === '0') {
    return $.ajax({
      headers: {
        'Authorization': 'Token token=' + store.userToken
      },
      url: config.apiOrigins.development + '/games',
      method: 'GET'
    })
  } else if (x === '1') {
    return $.ajax({
      headers: {
        'Authorization': 'Token token=' + store.userToken
      },
      url: config.apiOrigins.development + '/games?over=true',
      method: 'GET'
    })
  } else if (x === '2') {
    return $.ajax({
      headers: {
        'Authorization': 'Token token=' + store.userToken
      },
      url: config.apiOrigins.development + '/games?over=false',
      method: 'GET'
    })
  }
}

const updateGameAPI = function (gamedata) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/games/' + store.currentGameID,
    method: 'PATCH',
    data: {
      'game': gamedata
    }
  })
}

const startLoadGame = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/games/' + data.game.id,
    method: 'GET'
  })
}

module.exports = {
  createGame,
  gameHistory,
  updateGameAPI,
  startLoadGame
}
