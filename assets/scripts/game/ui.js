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

module.exports = {
  createGameSuccess,
  createGameFailure
}
