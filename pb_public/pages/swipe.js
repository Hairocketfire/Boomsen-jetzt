'use strict'

var boomsenContainer = document.querySelector('.boomsen')
var nope = document.getElementById('nope')
var love = document.getElementById('love')

const users = [
  {
    name: 'Chronistin',
    tagline: 'Zeitlose Erzählerin, die Geschichten zum Leben erweckt.',
  },
  {
    name: 'Marie',
    tagline: 'Schönheit mit einem Hauch von Arroganz, sucht Abenteuer.',
  },
  {
    name: 'Johanna',
    tagline: 'Verführerische Intrigantin, die weiß, was sie will.',
  },
  {
    name: 'Emma',
    tagline: 'Sanfte Seele, blind für die Welt, aber sehend im Herzen.',
  },
  {
    name: 'Berthold',
    tagline:
      'Tapferer Ritter auf der Suche nach wahrer Liebe und Gerechtigkeit.',
  },
  {
    name: 'Liebhaber',
    tagline: 'Hoffnungsloser Romantiker mit einer Leidenschaft für Musik.',
  },
  {
    name: 'Monster',
    tagline: 'Geheimnisvolle Gestalt, die Rache und Gerechtigkeit sucht.',
  },
  {
    name: 'Magd',
    tagline: 'Treue Dienerin, deren Loyalität über den Tod hinausgeht.',
  },
  {
    name: 'Logge',
    tagline: 'Robuster Bergmann mit einer Botschaft zu überbringen.',
  },
  {
    name: 'Bär',
    tagline: 'Majestätischer Bär, der die Wälder beherrscht.',
  },
].sort(() => Math.random() - 0.5)

// <div class="boomsen--card">
//   <img src="pictures/accounts/Berthold.png" />
//   <h3>Demo card 1</h3>
//   <p>This is a demo for boomsen like swipe cards</p>
// </div>

const cardContainer = document.querySelector('.boomsen--cards')
for (const user of users) {
  const initialCard = document.createElement('div')
  initialCard.classList.add('boomsen--card')
  initialCard.innerHTML = `
    <img src="pictures/accounts/${user.name}.png" />
    <h3>${user.name}</h3>
    <p>${user.tagline}</p>
  `
  cardContainer.appendChild(initialCard)
}

var allCards = document.querySelectorAll('.boomsen--card')

function initCards(card, index) {
  var newCards = document.querySelectorAll('.boomsen--card:not(.removed)')

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index
    card.style.transform =
      'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)'
    card.style.opacity = (10 - index) / 10
  })

  boomsenContainer.classList.add('loaded')
}

allCards.forEach(function (el) {
  console.log(allCards)
  var hammertime = new Hammer(el)

  hammertime.on('pan', function (event) {
    el.classList.add('moving')
  })

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return
    if (event.center.x === 0 && event.center.y === 0) return

    boomsenContainer.classList.toggle('boomsen_love', event.deltaX > 0)
    boomsenContainer.classList.toggle('boomsen_nope', event.deltaX < 0)

    var xMulti = event.deltaX * 0.03
    var yMulti = event.deltaY / 80
    var rotate = xMulti * yMulti

    const xFactor = Math.min(Math.abs(event.deltaX / 200, 1))
    if (event.deltaX > 0) {
      // Increase scale of love
      const loveScale = 1 + xFactor * 0.2
      love.style.transform = `scale(${loveScale})`
      nope.style.transform = `scale(1)`
    } else {
      // Increase scale of nope
      const nopeScale = 1 + xFactor * 0.2
      nope.style.transform = `scale(${nopeScale})`
      love.style.transform = `scale(1)`
    }

    event.target.style.transform =
      'translate(' +
      event.deltaX +
      'px, ' +
      event.deltaY +
      'px) rotate(' +
      rotate +
      'deg)'
  })

  hammertime.on('panend', function (event) {
    el.classList.remove('moving')
    boomsenContainer.classList.remove('boomsen_love')
    boomsenContainer.classList.remove('boomsen_nope')

    // Reset scale of buttons
    love.style.transform = `scale(1)`
    nope.style.transform = `scale(1)`

    var moveOutWidth = document.body.clientWidth
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5

    event.target.classList.toggle('removed', !keep)

    if (keep) {
      event.target.style.transform = ''
    } else {
      var endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      )
      var toX = event.deltaX > 0 ? endX : -endX
      var endY = Math.abs(event.velocityY) * moveOutWidth
      var toY = event.deltaY > 0 ? endY : -endY
      var xMulti = event.deltaX * 0.03
      var yMulti = event.deltaY / 80
      var rotate = xMulti * yMulti

      event.target.style.transform =
        'translate(' +
        toX +
        'px, ' +
        (toY + event.deltaY) +
        'px) rotate(' +
        rotate +
        'deg)'
      initCards()
    }
  })
})

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.boomsen--card:not(.removed)')
    var moveOutWidth = document.body.clientWidth * 1.5

    if (!cards.length) return false

    var card = cards[0]

    card.classList.add('removed')

    if (love) {
      card.style.transform =
        'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'
    } else {
      card.style.transform =
        'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)'
    }

    initCards()

    event.preventDefault()
  }
}

var nopeListener = createButtonListener(false)
var loveListener = createButtonListener(true)

nope.addEventListener('click', nopeListener)
love.addEventListener('click', loveListener)

initCards()
