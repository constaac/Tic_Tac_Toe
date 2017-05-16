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
module.exports = {
  signUpSuccess,
  signUpFailure
}
