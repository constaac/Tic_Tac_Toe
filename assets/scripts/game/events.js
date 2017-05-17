'use strict'

const api = require('./api')
const ui = require('./ui')

const onCreateGame = function () {
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

// const onTopLeft = function (player) {
//
//   // api.topLeft()
// }

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
}

module.exports = {
  addHandlers
}
