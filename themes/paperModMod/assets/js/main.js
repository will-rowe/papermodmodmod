// navigation
const navMenu = document.querySelector('.navMenu')
const navCloser = document.querySelector('.navCloser')
const navGus = document.getElementById('navGusR')
const navGusL = document.getElementById('navGusL')

function openMenu () {
  navGus.classList.remove('duckWalkOn')
  navGus.style.display = 'none'
  navGusL.style.display = 'block'
  navGusL.classList.add('duckWalkOff')
  navMenu.classList.add('active')
}

function closeMenu () {
  navMenu.classList.remove('active')
  navGusL.classList.remove('duckWalkOff')
  navGusL.style.display = 'none'
  navGus.style.display = 'block'
  navGus.classList.add('duckWalkOn')
}

navGus.addEventListener('click', openMenu)
navCloser.addEventListener('click', closeMenu)
window.addEventListener('click', function (e) {
  var node = e.target
  var inside = false
  while (node) {
    if (
      node.classList.contains('navMenu') ||
      node.classList.contains('navGus')
    ) {
      inside = true
      break
    }
    node = node.parentElement
  }
  if (!inside) {
    closeMenu()
  }
})

// touch
document.addEventListener('touchstart', handleTouchStart, false)
document.addEventListener('touchmove', handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches (evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ) // jQuery
}

function handleTouchStart (evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove (evt) {
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /* swipe right */
    if (xDiff < 0) {
      openMenu()
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

// dark mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
  if (document.body.className.includes('dark')) {
    document.body.classList.remove('dark')
    localStorage.setItem('pref-theme', 'light')
  } else {
    document.body.classList.add('dark')
    localStorage.setItem('pref-theme', 'dark')
  }
})

// scroller
window.onload = function () {
  if (localStorage.getItem('menu-scroll-position')) {
    document.getElementById('menu').scrollLeft = localStorage.getItem(
      'menu-scroll-position'
    )
  }
}
var mybutton = document.getElementById('top-link')
window.onscroll = function () {
  if (
    document.body.scrollTop > 800 ||
    document.documentElement.scrollTop > 800
  ) {
    mybutton.style.visibility = 'visible'
    mybutton.style.opacity = '1'
  } else {
    mybutton.style.visibility = 'hidden'
    mybutton.style.opacity = '0'
  }
}
mybutton.onclick = function () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.location.hash = ''
}

function menu_on_scroll () {
  localStorage.setItem(
    'menu-scroll-position',
    document.getElementById('menu').scrollLeft
  )
}

// ingredients
const metricUnits = ['g', 'kg', 'ml', 'l']
var defaultServe
var ingredients
window.onload = function () {
  defaultServe = document.getElementById('serve_size')
  ingredients = Array.from(document.querySelectorAll('.ingredient'))
  if (defaultServe && ingredients.length !== 0) {
    document
      .querySelector('.spinner.increment')
      .addEventListener('click', increment)
    document
      .querySelector('.spinner.decrement')
      .addEventListener('click', decrement)
  }
}

function scaleIngredients (newServe, oldServe) {
  var ratio = newServe / oldServe
  ingredients.forEach(function (ingredient) {
    var amount = ingredient.querySelector('.ingredient__amount')
    var units = ingredient.querySelector('.ingredient__units')
    var newAmount = parseFloat(amount.innerText) * ratio
    if (metricUnits.includes(units.innerText)) {
      newAmount = newAmount.toFixed(2)
    } else {
      newAmount = newAmount.toFixed(1)
    }
    amount.innerText = Number(newAmount)
  })
}

const increment = () => {
  const serveInput = document.getElementById('serve_size')
  scaleIngredients(Number(serveInput.value) + 1, Number(serveInput.value))
  serveInput.value = Number(serveInput.value) + 1
  document.getElementById('serve_size_stats').value = serveInput.innerText
}
const decrement = () => {
  const serveInput = document.getElementById('serve_size')
  if (serveInput.value === '1') {
    return
  }
  scaleIngredients(Number(serveInput.value) - 1, Number(serveInput.value))
  serveInput.value = Number(serveInput.value) - 1
  document.getElementById('serve_size_stats').value = serveInput.innerText
}

var modalTrigger = document.getElementById('modalImgTrigger')
if (modalTrigger) {
  var modal = document.getElementById('modalImg')
  var modalImg = document.getElementById('modalImgContent')
  var closeBtn = document.getElementsByClassName('close')[0]
  modalTrigger.onclick = function () {
    modal.style.display = 'block'
    modalImg.src = this.src
  }
  closeBtn.onclick = function () {
    modal.style.display = 'none'
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const links = document.getElementsByClassName('extLink')
  if (links.length > 0) {
    links.forEach(link => {
      const isExternal = link.hostname !== window.location.hostname
      if (isExternal) {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      }
    })
  }
})
