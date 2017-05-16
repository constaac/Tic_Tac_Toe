'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('test test ' + data)
  api.signUp(data)
  .then(ui.signUpSuccess)
  .catch(ui.signUpFailure)
}

const onLogin = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('test test ' + data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const addHandlers = () => {
  $('#signup-form').on('submit', onSignUp)
  $('#login-form').on('submit', onLogin)
}

module.exports = {
  addHandlers
}
