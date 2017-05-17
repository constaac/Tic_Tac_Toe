'use strict'
const store = require('../store')

const signUpSuccess = (data) => {
  console.log(data)
  $('.signupstatus').html('Account Creation Successful!')
  $('.signupstatus').css('color', 'green')
}

const signUpFailure = (error) => {
  console.error(error)
  $('.signupstatus').html('Account Creation Unsuccessful... Check that your passwords match!')
  $('.signupstatus').css('color', 'red')
}

const signInSuccess = (data) => {
  console.log(data)
  $('#loginModal').modal('toggle')
  $('.hidebutton').css('display', 'none')
  $('.start-display-none').css('display', 'inline')
  $('.start-display-none-logout').css('display', 'inline')
  $('.start-display-none-password').css('display', 'inline')
  $('.login-status').text('Signed in as ' + store.userEmail)
  $('#welcome-message').css('display', 'none')
  $('#gameboard').css('display', 'block')
  console.log(store.userID)
}

const signInFailure = (error) => {
  console.error(error)
  $('.signinstatus').html('Sign-in Unsuccessful... Check your password!')
  $('.signinstatus').css('color', 'red')
}

const logoutSuccess = (data) => {
  console.log(data)
  console.log('Logged that bitch out!')
  $('.login-status').text('')
  $('.hidebutton').css('display', 'inline')
  $('.start-display-none-logout').css('display', 'none')
  $('.start-display-none-password').css('display', 'none')
  $('#welcome-message').css('display', 'block')
  $('#gameboard').css('display', 'none')
  $('.gameid-indicator').text('')
  $('.game-history').empty()
  $('.empty-game-history').css('display', 'none')
}

const logoutFailure = (error) => {
  console.error(error)
  console.log("Didn't log that bitch out...")
  $('.login-status').text('Error logging out!')
}

const changePasswordSuccess = (data) => {
  console.log(data)
  $('.passwordstatus').html('Password Change Successful!')
  $('.passwordstatus').css('color', 'green')
}

const changePasswordFailure = (error) => {
  console.error(error)
  $('.passwordstatus').html('Password Change Unsuccessful...')
  $('.passwordstatus').css('color', 'red')
}

const onClosePasswordPrompt = () => {
  $('.passwordstatus').text('')
}

const onCloseLoginPrompt = () => {
  $('.signinstatus').text('')
}

const onCloseSignupPrompt = () => {
  $('.signupstatus').text('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logoutSuccess,
  logoutFailure,
  changePasswordFailure,
  changePasswordSuccess,
  onClosePasswordPrompt,
  onCloseLoginPrompt,
  onCloseSignupPrompt
}
