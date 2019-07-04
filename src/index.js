document.addEventListener('DOMContentLoaded', getDoggos)

function getDoggos() {
  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(doggos => renderDoggos(doggos))
  .then(addEventListenersToPage)
}

function renderDoggos(doggos) {
  doggos.forEach(doggo => addDoggoToBar(doggo))
}

const dogBar = document.querySelector('#dog-bar')

function addDoggoToBar(doggo) {
  const spanItem = document.createElement('span')
  spanItem.id = `${doggo.id}-span`
  spanItem.className = 'btn-show'
  spanItem.dataset.isGoodDog = doggo.isGoodDog
  spanItem.innerHTML = doggo.name
  dogBar.appendChild(spanItem)
  // dogBar.innerHTML += `
  // <span id="${doggo.id}-span" class="btn-show">
  //   ${doggo.name}
  // </span>
  // `
}

const dogInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')

function addEventListenersToPage() {
  dogBar.addEventListener('click', (e) => {
    if (Number.isInteger(parseInt(e.target.id.split('-')[0]))) {
      fetch(`http://localhost:3000/pups/${e.target.id.split('-')[0]}`)
      .then(resp => resp.json())
      .then(doggo => addDoggoToPage(doggo))
    } else {
      console.log("Not Span haha")
    }
  })


  goodDogFilter.addEventListener('click', (e) => {
    if (e.target.dataset.isGoodDog === 'true') {
      e.target.dataset.isGoodDog = 'false'
      e.target.innerText = 'Filter good dogs: OFF'
      hideShowBadDoggos(e)
    } else {
      e.target.dataset.isGoodDog = 'true'
      e.target.innerText = 'Filter good dogs: ON'
      hideShowBadDoggos(e)
    }
  })

  dogInfo.addEventListener('click', (e) => {
    if (e.target.id === 'goodDog') {
      if (e.target.innerText === 'Good Dog!') {
        e.target.innerText = 'Bad Dog!'
      } else {
        e.target.innerText = 'Good Dog!'
      }
    }
  })
}

function addDoggoToPage(doggo) {
  const button = document.createElement('button')
  dogInfo.innerHTML = `
  <div id="${doggo.id}-div">
    <img src="${doggo.image}"/>
    <h2>${doggo.name}</h2>
  </div>
  <br>
  `
  const div = document.getElementById(`${doggo.id}-div`)
  button.innerText = doggo.isGoodDog ? "Good Dog!" : "Bad Dog!"
  button.id = "goodDog"
  div.appendChild(button)
}

function hideShowBadDoggos(e) {
  const badDoggos = document.querySelectorAll('.btn-show')
  if (e.target.dataset.isGoodDog = 'true') {
    badDoggos.forEach(doggo => {
      if (doggo.dataset.isGoodDog === 'false') {
        doggo.style.visibility = "hidden"
      }
  })
  } else {
    badDoggos.forEach(doggo => {
      if (doggo.dataset.isGoodDog === 'false') {
        doggo.style.visibility = "visible"
      }
  })
}}
