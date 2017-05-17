'use strict'

const api = require('./api')
const ui = require('./ui')

const onCreateGame = function () {
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onGameHistory = function () {
  const query = $('input[name="history-query"]:checked').val()
  api.gameHistory(query)
    .then(ui.gameHistorySuccess)
    .catch(ui.gameHistoryFailure)
}

const addHandlers = () => {
  // $('.top-left').on('click', onTopLeft)
  // $('.top-middle').on('click', onTopMiddle)
  // $('.top-right').on('click', onTopRight)
  // $('.middle-left').on('click', onMiddleLeft)
  // $('.middle-middle').on('click', onMiddleMiddle)
  // $('.middle-right').on('click', onMiddleRight)
  // $('.bottom-left').on('click', onBottomLeft)
  // $('.bottom-middle').on('click', onBottomMiddle)
  // $('.bottom-right').on('click', onBottomRight)
  $('#create-game-button').on('click', onCreateGame)
  $('#load-game-history-button').on('click', onGameHistory)
}

module.exports = {
  addHandlers
}
