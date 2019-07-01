const dogContainer = document.querySelector("#dog-bar")
const dogInfoContainer = document.querySelector("#dog-info")
const filterButton = document.querySelector("#good-dog-filter")

const pupsArry = [];

fetch("http://localhost:3000/pups")
.then(resp => resp.json())
.then(json => {
  json.forEach((pup) => {
    pupsArry.push(pup);
    dogContainer.innerHTML += `
    <span class = "dog-bar" id = "${pup.id}">${pup.name}</span>
    `
  })
})

dogContainer.addEventListener('click', (e) => {
  if (e.target.className === 'dog-bar') {
    fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(resp => resp.json())
    .then(json => {
      if (json.isGoodDog) {
        json.isGoodDog = "Good Dog!"
      } else {
        json.isGoodDog = "Bad Dog!"
      }
      dogInfoContainer.innerHTML = `
      <img src="${json.image}">
      <h2>${json.name}</h2>
      <p hidden>${json.id}</p>
      <button class ="good-or-bad">${json.isGoodDog}</button>
      `
    })
  }
})

dogInfoContainer.addEventListener('click', (e) => {
  if (e.target.className === 'good-or-bad'){
    debugger
    let goodDog = true
    if (e.target.innerText === "Good Dog!") {
      goodDog = false;
    }
    fetch(`http://localhost:3000/pups/${e.target.previousElementSibling.innerText}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: goodDog
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isGoodDog) {
        json.isGoodDog = "Good Dog!"
      } else {
        json.isGoodDog = "Bad Dog!"
      }
      e.target.innerText = json.isGoodDog
    })
  }
})

filterButton.addEventListener('click', (e) => {
  if (e.target.innerText === "Filter good dogs: OFF") {
    e.target.innerText = "Filter good dogs: ON"
  } else {
    e.target.innerText = "Filter good dogs: OFF"
  }

  if (e.target.innerText === "Filter good dogs: ON") {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => {
      const filtered = json.filter(pup => pup.isGoodDog === true)
      dogContainer.innerHTML = ""
      filtered.forEach((pup) => {
        dogContainer.innerHTML += `
        <span class = "dog-bar" id = "${pup.id}">${pup.name}</span>
        `
      })
    })
  } else {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => {
      dogContainer.innerHTML = ""
      json.forEach((pup) => {
        dogContainer.innerHTML += `
        <span class = "dog-bar" id = "${pup.id}">${pup.name}</span>
        `
      })
    })
  }
  })
