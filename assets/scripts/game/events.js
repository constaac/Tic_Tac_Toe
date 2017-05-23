'use strict'

const api = require('./api')
const ui = require('./ui')
const gamelogic = require('./gamelogic')
const getFormFields = require(`../../../lib/get-form-fields`)

const onCreateGame = function () {
  gamelogic.resetCurrentStats()
  api.createGame()
    .then(ui.createGameSuccess)
    .then(gamelogic.updateGame)
    .then(gamelogic.restartAllOnClicks)
    .catch(ui.createGameFailure)
}

const onGameHistory = function () {
  const query = $('input[name="history-query"]:checked').val()
  api.gameHistory(query)
    .then(ui.gameHistorySuccess)
    .catch(ui.gameHistoryFailure)
}

const onStatistics = function () {
  api.gameStatistics()
    .then(ui.statisticsSuccess)
    .catch(ui.statisticsFailure)
}

const onTopLeft = function () {
  gamelogic.changeSpace(0)
}
const onTopMiddle = function () {
  gamelogic.changeSpace(1)
}
const onTopRight = function () {
  gamelogic.changeSpace(2)
}
const onMiddleLeft = function () {
  gamelogic.changeSpace(3)
}
const onMiddleMiddle = function () {
  gamelogic.changeSpace(4)
}
const onMiddleRight = function () {
  gamelogic.changeSpace(5)
}
const onBottomLeft = function () {
  gamelogic.changeSpace(6)
}
const onBottomMiddle = function () {
  gamelogic.changeSpace(7)
}
const onBottomRight = function () {
  gamelogic.changeSpace(8)
}

const onLoadGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.game.id === '') {
    $('.loadstatus').text('Enter a game ID')
    $('.loadstatus').css('visibility', 'visible')
    setTimeout(function () {
      $('.loadstatus').css('visibility', 'hidden')
      $('.loadstatus').text('An error occured (Make sure the game exists)')
    }, 3000)
    return
  }
  api.startLoadGame(data)
    .then(ui.loadGameSuccess)
    .then(gamelogic.restartAllOnClicks)
    .then((response) => {
      for (let i = 0; i < response.game.cells.length; i++) {
        if (response.game.cells[i] !== '') {
          $('.div' + i).off('click')
        }
      }
    })
    .catch(() => {
      $('.loadstatus').css('visibility', 'visible')
      setTimeout(function () {
        $('.loadstatus').css('visibility', 'hidden')
      }, 3000)
    })
}

const onFTWR = function () {
  ui.FTWRIn()
}

const addHandlers = () => {
  $('.div0').on('click', onTopLeft)
  $('.div1').on('click', onTopMiddle)
  $('.div2').on('click', onTopRight)
  $('.div3').on('click', onMiddleLeft)
  $('.div4').on('click', onMiddleMiddle)
  $('.div5').on('click', onMiddleRight)
  $('.div6').on('click', onBottomLeft)
  $('.div7').on('click', onBottomMiddle)
  $('.div8').on('click', onBottomRight)
  $('#create-game-button').on('click', onCreateGame)
  $('#load-game-history-button').on('click', onGameHistory)
  $('#load-form').on('submit', onLoadGame)
  $('#statistics-button').on('click', onStatistics)
  $('#FTWR-pic').on('click', onFTWR)
}

module.exports = {
  addHandlers,
  onTopLeft,
  onTopMiddle,
  onTopRight,
  onMiddleLeft,
  onMiddleRight,
  onMiddleMiddle,
  onBottomLeft,
  onBottomMiddle,
  onBottomRight
}
