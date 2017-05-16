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
  $('.nav-account').text('Signed in as ' + store.userID)
}

const signInFailure = (error) => {
  console.error(error)
  $('.signinstatus').html('Sign-in Unsuccessful... Check your password!')
  $('.signinstatus').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
