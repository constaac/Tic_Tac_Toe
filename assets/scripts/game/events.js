'use strict'

const api = require('./api')
const ui = require('./ui')

const onTopLeft = function (player) {

  // api.topLeft()
}

const addHandlers = () => {
  $('.top-left').on('click', onTopLeft)
  $('.top-middle').on('click', onTopMiddle)
  $('.top-right').on('click', onTopRight)
  $('.middle-left').on('click', onMiddleLeft)
  $('.middle-middle').on('click', onMiddleMiddle)
  $('.middle-right').on('click', onMiddleRight)
  $('.bottom-left').on('click', onMiddleLeft)
  $('.bottom-middle').on('click', onMiddleMiddle)
  $('.bottom-right').on('click', onMiddleRight)
}

module.exports = {
  addHandlers
}
