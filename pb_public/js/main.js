// Login Dialog
function submitLogin(e) {
  e.preventDefault() // This prevents the form actually getting submitted
  console.log(e)

  const {username, password } = e.target.elements
  console.log(username.value, password.value)

  
  // If correct deactivate loginDialog
  document.getElementById('loginDialog').classList.remove('active')

  return false
}

// Register
function submitRegister(e) {
  e.preventDefault() // This prevents the form actually getting submitted
  console.log(e)

  // If correct deactivate loginDialog
  document.getElementById('loginDialog').classList.remove('active')

  return false
}


