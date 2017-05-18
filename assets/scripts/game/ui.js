'use strict'

const gamelogic = require('./gamelogic')

const createGameSuccess = function (response) {
  $('.create-error').css('color', 'green')
  $('.create-error').text('Game Created!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
  $('#turn-indicator').text("X's Turn")
  $('#outcome-indicator').text("")
  gamelogic.resetBoardColors()
  return response
}

const createGameFailure = function (response) {
  $('.create-error').css('color', 'red')
  $('.create-error').text('Error creating game!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
}

const gameHistorySuccess = function (response) {
  $('.game-history').empty()
  $('.empty-game-history').css('display', 'none')
  if (response.games.length === 0) {
    $('.empty-game-history').css('display', 'block')
    setTimeout(function () {
      $('.empty-game-history').css('display', 'none')
    }, 2000)
  }
  response.games.forEach(function (element) {
    $('.game-history').append('<li><ul><li>Game ID: ' + element.id + '</li><li>Game is Over: ' + element.over + '</li></ul></li><br>')
  })
}

const gameHistoryFailure = function (response) {
  $('.empty-game-history1').text('Error Loading Game History!')
  $('.empty-game-history1').css('display', 'block')
  setTimeout(function () {
    $('.empty-game-history1').css('display', 'none')
    $('.empty-game-history1').text('No Games Found!')
  }, 2000)
}

const loadGameSuccess = function (response) {
  $('#loadModal').modal('hide')
  $('#outcome-indicator').text('')
  gamelogic.resetCurrentStats()
  gamelogic.calcCurrentTurnCounter(response)
  gamelogic.setTurnIndicator()
  gamelogic.updateGame(response)
  gamelogic.resetBoardColors()
  if (gamelogic.winCheck()) {
    $('#outcome-indicator').text('Winner!')
    $('#turn-indicator').text('')
    gamelogic.winCheck(true)
    return response
  } else if (response.game.over) {
    $('#outcome-indicator').text('Draw')
    $('#turn-indicator').text('')
    return response
  } else {
    return response
  }
}

const loadGameFailure = function (response) {

}

module.exports = {
  createGameSuccess,
  createGameFailure,
  gameHistorySuccess,
  gameHistoryFailure,
  loadGameSuccess,
  loadGameFailure
}
