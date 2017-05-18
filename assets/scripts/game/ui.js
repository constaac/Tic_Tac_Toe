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
  $('#outcome-indicator').text('')
  gamelogic.resetBoardColors()
  return response
}

const createGameFailure = function (response) {
  $('.create-error').css('color', 'red')
  $('.create-error').text('Error creating game!')
  $('.create-error').css('visibility', 'visible')
  $('#turn-indicator').text('')
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

const statisticsSuccess = function (response) {
  let arrayofgames = []
  arrayofgames = response.games
  let xcounter = 0
  let ocounter = 0
  let dcounter = 0
  arrayofgames.forEach((response) => {
    if ((response.cells[0] === response.cells[1]) && (response.cells[1] === response.cells[2] && response.cells[2] !== '')) {
      if (response.cells[0] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[3] === response.cells[4]) && (response.cells[4] === response.cells[5] && response.cells[5] !== '')) {
      if (response.cells[3] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[6] === response.cells[7]) && (response.cells[7] === response.cells[8] && response.cells[8] !== '')) {
      if (response.cells[6] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[0] === response.cells[4]) && (response.cells[4] === response.cells[8] && response.cells[8] !== '')) {
      if (response.cells[0] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[2] === response.cells[4]) && (response.cells[4] === response.cells[6] && response.cells[6] !== '')) {
      if (response.cells[2] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[0] === response.cells[3]) && (response.cells[3] === response.cells[6] && response.cells[6] !== '')) {
      if (response.cells[0] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[1] === response.cells[4]) && (response.cells[4] === response.cells[7] && response.cells[7] !== '')) {
      if (response.cells[1] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else if ((response.cells[2] === response.cells[5]) && (response.cells[5] === response.cells[8] && response.cells[8] !== '')) {
      if (response.cells[2] === 'x') {
        xcounter += 1
      } else {
        ocounter += 1
      }
    } else {
      dcounter += 1
    }
  })
  const totalwins = xcounter + ocounter
  const wdratioraw = (xcounter + ocounter) / dcounter
  const xoratioraw = xcounter / ocounter
  let wdratio = wdratioraw
  if (isNaN(wdratio)) {
    wdratio = 0
  }
  let xoratio = xoratioraw
  if (isNaN(xoratio)) {
    xoratio = 0
  }
  wdratio = parseFloat(wdratio.toFixed(2))
  xoratio = parseFloat(xoratio.toFixed(2))
  $('#totalwins').text('Total Wins: ' + totalwins)
  $('#xcounter').text('"X" Wins: ' + xcounter)
  $('#ocounter').text('"O" Wins: ' + ocounter)
  $('#dcounter').text('Draws: ' + dcounter)
  $('#wdratio').text('Win/Draw Ratio: ' + wdratio)
  $('#xoratio').text('X/O Win Ratio: ' + xoratio)
  $('#statistics-modal').modal('show')
}

const statisticsFailure = function () {
  $('.statistics-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.statistics-error').css('visibility', 'hidden')
  }, 2000)
}

const FTWRIn = function () {
  $('#FTWR-modal').modal('show')
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  gameHistorySuccess,
  gameHistoryFailure,
  loadGameSuccess,
  statisticsSuccess,
  statisticsFailure,
  FTWRIn
}
