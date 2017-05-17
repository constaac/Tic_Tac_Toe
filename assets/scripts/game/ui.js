'use strict'

const createGameSuccess = function (response) {
  console.log(response)
  $('.gameid-indicator').text(response.game.id)
  $('.create-error').css('color', 'green')
  $('.create-error').text('Game Created!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
}

const createGameFailure = function (response) {
  console.log(response)
  $('.create-error').css('color', 'red')
  $('.create-error').text('Error creating game!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
}

const gameHistorySuccess = function (response) {
  console.log(response.games)
  $('.game-history').empty()
  $('.empty-game-history').css('display', 'none')
  if (response.games.length === 0) {
    $('.empty-game-history').css('display', 'block')
    setTimeout(function () {
      $('.empty-game-history').css('display', 'none')
    }, 2000)
  }
  response.games.forEach(function (element) {
    if (element.player_o === null) {
      $('.game-history').append('<li><ul><li>Game ID: ' + element.id + '</li><li>Game is Over: ' + element.over + '</li><li>Single-Player Game</li><li>Player X: ' + element.player_x.email + '</li></ul></li><br>')
    } else {
      $('.game-history').append('<li><ul><li>Game ID: ' + element.id + '</li><li>Game is Over: ' + element.over + '</li><li>Multi-Player Game</li><li>Player X: ' + element.player_x.email + '</li><li>Player O: ' + element.player_o.email + '</li></ul></li><br>')
    }
  })
}

const gameHistoryFailure = function (response) {
  console.log(response)
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  gameHistorySuccess,
  gameHistoryFailure
}
