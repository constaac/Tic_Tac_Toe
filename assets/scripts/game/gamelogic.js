'use strict'

const api = require('./api')
const store = require('../store')

// current stats (clientside)
let currentTurn
let currentGame = []
let currentGameID = {}
let currentTurnCounter = 0
let currentGameState = false

const resetCurrentStats = function () {
  currentTurn = ''
  currentGame = []
  currentGameID = {}
  currentTurnCounter = 0
  currentGameState = false
}

const setTurnIndicator = function () {
  if (currentTurnCounter % 2 === 0) {
    $('#turn-indicator').text("X's Turn")
  } else if (currentTurnCounter % 2 === 1) {
    $('#turn-indicator').text("O's Turn")
  }
}

// turn calculator
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

// Possibly where the bug lies - globalize movestaken, and reset it on function call
const overChecker = function () {
  let movesTaken = 0
  currentGame.forEach((element) => {
    if (element !== '') {
      movesTaken = movesTaken + 1
    }
  })
  if (winCheck() === true) {
    return true
  }
  if (movesTaken === 9) {
    return true
  }
}

const calcCurrentTurnCounter = function (data) {
  let tempCounter = 0
  data.game.cells.forEach((element) => {
    if (element !== '') {
      tempCounter += 1
    }
  })
  currentTurnCounter = tempCounter
}

const restartOnClicks = function (x) {
  if (x === 0) {
    $('.div0').on('click', onTopLeft)
  } else if (x === 1) {
    $('.div1').on('click', onTopMiddle)
  } else if (x === 2) {
    $('.div2').on('click', onTopRight)
  } else if (x === 3) {
    $('.div3').on('click', onMiddleLeft)
  } else if (x === 4) {
    $('.div4').on('click', onMiddleMiddle)
  } else if (x === 5) {
    $('.div5').on('click', onMiddleRight)
  } else if (x === 6) {
    $('.div6').on('click', onBottomLeft)
  } else if (x === 7) {
    $('.div7').on('click', onBottomMiddle)
  } else if (x === 8) {
    $('.div8').on('click', onBottomRight)
  } else {
    return
  }
}

const restartAllOnClicks = function (response) {
  $('.div0').on('click', onTopLeft)
  $('.div1').on('click', onTopMiddle)
  $('.div2').on('click', onTopRight)
  $('.div3').on('click', onMiddleLeft)
  $('.div4').on('click', onMiddleMiddle)
  $('.div5').on('click', onMiddleRight)
  $('.div6').on('click', onBottomLeft)
  $('.div7').on('click', onBottomMiddle)
  $('.div8').on('click', onBottomRight)
  return response
}

const onTopLeft = function () {
  changeSpace(0)
}
const onTopMiddle = function () {
  changeSpace(1)
}
const onTopRight = function () {
  changeSpace(2)
}
const onMiddleLeft = function () {
  changeSpace(3)
}
const onMiddleMiddle = function () {
  changeSpace(4)
}
const onMiddleRight = function () {
  changeSpace(5)
}
const onBottomLeft = function () {
  changeSpace(6)
}
const onBottomMiddle = function () {
  changeSpace(7)
}
const onBottomRight = function () {
  changeSpace(8)
}

const changeSpace = function (cellindex) {
  const currentCellIndex = cellindex
  $('.div' + cellindex).off('click')
  if (currentGameState) {
    return
  }
  if (currentTurn === 'x') {
    currentGame[cellindex] = 'x'
  } else if (currentTurn === 'o') {
    currentGame[cellindex] = 'o'
  }
  if (($('#' + cellindex).text() === '') && ($.active === 0)) {
    const game = {
      cell: {}
    }
    if (overChecker()) {
      game.over = true
    } else {
      game.over = false
    }
    game.cell.index = cellindex
    game.cell.value = currentTurn
    if (currentTurn === 'x') {
      api.updateGameAPI(game)
        .then((response) => {
          currentTurnCounter += 1
          currentGame[cellindex] = 'x'
          $('#' + cellindex).text('X')
          currentTurn = 'o'
          if (currentTurnCounter === 9) {
            $('#turn-indicator').text('')
          } else {
            $('#turn-indicator').text("O's Turn")
          }
          return response
        })
        .then(updateGame)
        .then((response) => {
          if (response.game.over === true) {
            currentGameState = true
            $('#turn-indicator').text('')
            if (winCheck()) {
              $('#outcome-indicator').text('Winner!')
              winCheck(true)
            } else if (currentTurn < 9) {
              return
            } else {
              $('#outcome-indicator').text('Draw')
              return
            }
          }
        })
        .catch(() => {
          $('.fatal-errors').text('An error occured')
          currentGame[currentCellIndex] = ''
          restartOnClicks(currentCellIndex)
          setTimeout(function () {
            $('.fatal-errors').text('')
          }, 3000)
        })
    } else if (currentTurn === 'o') {
      api.updateGameAPI(game)
        .then((response) => {
          currentTurnCounter += 1
          currentGame[cellindex] = 'o'
          $('#' + cellindex).text('O')
          currentTurn = 'x'
          if (currentTurnCounter === 9) {
            $('#turn-indicator').text('')
          } else {
            $('#turn-indicator').text("X's Turn")
          }
          return response
        })
        .then(updateGame)
        .then((response) => {
          if (response.game.over === true) {
            currentGameState = true
            $('#turn-indicator').text('')
            if (winCheck()) {
              $('#outcome-indicator').text('Winner!')
              winCheck(true)
            } else if (currentTurn < 9) {
              return
            } else {
              $('#outcome-indicator').text('Draw')
              return
            }
          }
        })
        .catch(() => {
          $('.fatal-errors').text('An error occured')
          currentGame[currentCellIndex] = ''
          restartOnClicks(currentCellIndex)
          setTimeout(function () {
            $('.fatal-errors').text('')
          }, 3000)
        })
    } else {
      return
    }
  } else {
    return
  }
}

const changeColor = function (index, color) {
  $('#' + index).css('color', color)
}

const resetBoardColors = function () {
  for (let i = 0; i < 9; i++) {
    changeColor(i, 'black')
  }
}

const setToUpper = function (data) {
  for (let i = 0; i < 9; i++) {
    $('#' + i).text(data[i].toUpperCase())
  }
}

const updateGame = function (response) {
  currentGame = response.game.cells
  store.currentGameID = response.game.id
  $('.gameid-indicator').text(response.game.id)
  setToUpper(currentGame)
  calcTurn(response)
  currentGameState = response.game.over
  return response
}

const winCheck = function (x) {
  if ((currentGame[0] === currentGame[1]) && (currentGame[1] === currentGame[2] && currentGame[2] !== '')) {
    if (x === true) {
      changeColor(0, 'red')
      changeColor(1, 'red')
      changeColor(2, 'red')
    }
    return true
  } else if ((currentGame[3] === currentGame[4]) && (currentGame[4] === currentGame[5] && currentGame[5] !== '')) {
    if (x === true) {
      changeColor(3, 'red')
      changeColor(4, 'red')
      changeColor(5, 'red')
    }
    return true
  } else if ((currentGame[6] === currentGame[7]) && (currentGame[7] === currentGame[8] && currentGame[8] !== '')) {
    if (x === true) {
      changeColor(6, 'red')
      changeColor(7, 'red')
      changeColor(8, 'red')
    }
    return true
  } else if ((currentGame[0] === currentGame[4]) && (currentGame[4] === currentGame[8] && currentGame[8] !== '')) {
    if (x === true) {
      changeColor(0, 'red')
      changeColor(4, 'red')
      changeColor(8, 'red')
    }
    return true
  } else if ((currentGame[2] === currentGame[4]) && (currentGame[4] === currentGame[6] && currentGame[6] !== '')) {
    if (x === true) {
      changeColor(2, 'red')
      changeColor(4, 'red')
      changeColor(6, 'red')
    }
    return true
  } else if ((currentGame[0] === currentGame[3]) && (currentGame[3] === currentGame[6] && currentGame[6] !== '')) {
    if (x === true) {
      changeColor(0, 'red')
      changeColor(3, 'red')
      changeColor(6, 'red')
    }
    return true
  } else if ((currentGame[1] === currentGame[4]) && (currentGame[4] === currentGame[7] && currentGame[7] !== '')) {
    if (x === true) {
      changeColor(1, 'red')
      changeColor(4, 'red')
      changeColor(7, 'red')
    }
    return true
  } else if ((currentGame[2] === currentGame[5]) && (currentGame[5] === currentGame[8] && currentGame[8] !== '')) {
    if (x === true) {
      changeColor(2, 'red')
      changeColor(5, 'red')
      changeColor(8, 'red')
    }
    return true
  }
  return false
}

module.exports = {
  currentGame,
  currentTurn,
  updateGame,
  calcTurn,
  currentGameID,
  overChecker,
  changeSpace,
  resetCurrentStats,
  calcCurrentTurnCounter,
  setTurnIndicator,
  winCheck,
  resetBoardColors,
  restartAllOnClicks
}
