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
function navigateToPage(page, force) {
  document.getElementById('content').innerHTML = ''

  // If page is already active, do nothing
  if (!force && window.location.hash.substr(1) == page) return

  // Set hash
  window.location.hash = page

  // Fetch page
  fetch(`pages/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('content').innerHTML = html
      // Load coresponing js
      const script = document.createElement('script')
      script.src = `pages/${page}.js`
      document.body.appendChild(script)
      // Load coresponing css
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `pages/${page}.css`
      document.head.appendChild(link)
    })
}

function playAds() {
  const adsButton = document.getElementById('ads-button')
  const playing = adsButton.getAttribute('data-playing')

  // Random number between 1 and 3
  const random = Math.floor(Math.random() * 3) + 1

  // Get song src from audio/Werbung_1.mp3
  const audio = document.getElementById('ads-audio')

  // Play audio if not playing
  if (playing == 'false') {
    adsButton.querySelector('i').innerText = 'volume_off'
    audio.src = `audio/Werbung_${random}.mp3`
    audio.play()

    audio.onended = function () {
      adsButton.querySelector('i').innerText = 'volume_up'
      adsButton.setAttribute('data-playing', 'false')
    }

    adsButton.setAttribute('data-playing', 'true')
  } else {
    adsButton.querySelector('i').innerText = 'volume_up'
    audio.pause()
    adsButton.setAttribute('data-playing', 'false')
  }
}

if (window.location.hash) {
  const page = window.location.hash.substr(1)
  navigateToPage(page, true)
} else {
  navigateToPage('map', true)
}
