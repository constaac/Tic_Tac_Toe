'use strict'

const api = require('./api')
const store = require('../store')

let currentTurn
let currentGame = []
let currentGameID = {}

const resetCurrentStats = function () {
  currentTurn = ''
  currentGame = []
  currentGameID = {}
}

const calcTurn = function (response) {
  let xcounter = 0
  let ocounter = 0
  response.game.cells.forEach((item) => {
    if (item === 'x') {
      xcounter = xcounter + 1
    } else if (item === 'o') {
      ocounter = ocounter + 1
    }
  })
  const totalCount = xcounter + ocounter
  if (totalCount % 2 === 0) {
    currentTurn = 'x'
  } else {
    currentTurn = 'o'
  }
}

const overChecker = function () {
  let movesTaken = 0
  currentGame.forEach((element) => {
    if (element !== '') {
      movesTaken = movesTaken + 1
    }
  })
  if (movesTaken === 8) {
    return 'true'
  }
}

const changeSpace = function (cellindex) {
  if ($('#' + cellindex).text() === '') {
    const game = {
      cell: {}
    }
    if (overChecker() === 'true') {
      game.over = true
    } else {
      game.over = false
    }
    game.cell.index = cellindex
    game.cell.value = currentTurn
  if (currentTurn === 'x') {
        api.updateGameAPI(game)
          .then((response) => {
            currentGame[cellindex] = 'x'
            $('#' + cellindex).text('X')
            console.log('ahhhhhhh ' + currentGame)
            console.log('api says that as well -> ' + response.game.cells)
            currentTurn = 'o'
            return response
          })
          .then(updateGame)
          .then(calcTurn)
      } else if (currentTurn === 'o') {
        api.updateGameAPI(game)
        .then((response) => {
          currentGame[cellindex] = 'o'
          $('#' + cellindex).text('O')
          console.log('ahhhhhhh ' + currentGame)
          console.log('api says that as well -> ' + response.game.cells)
          currentTurn = 'x'
          return response
        })
          .then(updateGame)
          .then(calcTurn)
      } else {
        return
      }
    } else {
    console.log('not an empty space!')
    return
    }
}

const updateGame = function (response) {
  currentGame = response.game.cells
  store.currentGameID = response.game.id
  $('.gameid-indicator').text(response.game.id)
  $('.top-left-space').text(response.game.cells[0].toUpperCase())
  $('.top-middle-space').text(response.game.cells[1].toUpperCase())
  $('.top-right-space').text(response.game.cells[2].toUpperCase())
  $('.middle-left-space').text(response.game.cells[3].toUpperCase())
  $('.middle-middle-space').text(response.game.cells[4].toUpperCase())
  $('.middle-right-space').text(response.game.cells[5].toUpperCase())
  $('.bottom-left-space').text(response.game.cells[6].toUpperCase())
  $('.bottom-middle-space').text(response.game.cells[7].toUpperCase())
  $('.bottom-right-space').text(response.game.cells[8].toUpperCase())
  calcTurn(response)
  return response
}

module.exports = {
  currentGame,
  currentTurn,
  updateGame,
  calcTurn,
  currentGameID,
  overChecker,
  changeSpace,
  resetCurrentStats
}
