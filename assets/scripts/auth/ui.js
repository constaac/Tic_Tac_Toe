'use strict'

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
  $('.signinstatus').html('Sign-in Successful!')
  $('.signinstatus').css('color', 'green')
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
