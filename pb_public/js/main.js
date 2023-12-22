// Login Dialog
function submitLogin(e) {
  e.preventDefault() // This prevents the form actually getting submitted
  console.log(e)

  const { username, password } = e.target.elements
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

// Navigation
function navigateToPage(page) {
  document.getElementById('content').innerHTML = ''
  // Fetch page
  fetch(`pages/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('content').innerHTML = html
      // Load coresponing js
      const script = document.createElement('script')
      script.src = `pages/${page}.js`
      document.body.appendChild(script)
    })
}

navigateToPage('map')
