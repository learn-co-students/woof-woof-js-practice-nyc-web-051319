const dogsBar = document.querySelector('#dog-bar')
const dogsInfo = document.querySelector('#dog-info')
const filterBtn = document.querySelector('#good-dog-filter')
const dogObj = {}
let statusBtn

document.addEventListener('DOMContentLoaded', function() {
  fetchDogs()
})


function fetchDogs() {
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(dogs => {
    dogs.forEach(dog => renderDog(dog))
  })
}


filterBtn.addEventListener('click', function(e) {
  let status = filterBtn.innerText.split(" ").pop()
  if (status === "OFF") {
    filterBtn.innerText = "Filter good dogs: ON"
    dogsBar.innerHTML = ""
    for (const key in dogObj) {
      if (dogObj[key].isGoodDog === true) {
        renderDog(dogObj[key])
      }
    }
  } else {
    filterBtn.innerText = "Filter good dogs: OFF"
    fetchDogs()
  }
 })

dogsInfo.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    let dogId = dogObj[e.target.parentNode.childNodes[3].innerText].id
    if (statusBtn.innerText === "Good Dog!") {
      statusBtn.innerText = "Bad Dog!"
      let status = false
      updateDog(dogId, status)
    } else {
      statusBtn.innerText = "Good Dog!"
      let status = true
      updateDog(dogId, status)
    }
  }
})

function updateDog(dogId, status) {
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: status
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

function renderDog(dog) {
  const dogContainer = document.querySelector('#dog-bar')
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  dogContainer.appendChild(dogSpan)
  dogObj[dog.name] = {
    id: dog.id,
    name: dog.name,
    image: dog.image,
    isGoodDog: dog.isGoodDog
  }
}

dogsBar.addEventListener('click', function(e) {
  if (e.target.tagName === 'SPAN') {
    let dog = dogObj[e.target.innerText]
    statusBtn = document.createElement('button')
    if (dog.isGoodDog) {
      statusBtn.innerText = "Good Dog!"
    } else {
      statusBtn.innerText = "Bad Dog!"
    }
    dogsInfo.innerHTML = `
    <image src="${dog.image}"/>
    <h2>${dog.name}</h2>
    `
    dogsInfo.appendChild(statusBtn)
  }
})
