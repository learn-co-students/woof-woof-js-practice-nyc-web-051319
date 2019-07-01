
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const goodDogFilter = document.querySelector("#good-dog-filter")
let goodDogFilterValue = false
let goodBoy; 

fetch("http://localhost:3000/pups")
.then(resp => resp.json())
.then(json => addDogNames(dogBar, json))

function addDogNames(dogBar, json) {
    dogBar.innerHTML = ''
    json.forEach(dog => {
        dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
    })
}

dogBar.addEventListener("click", e => {
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
    .then(resp => resp.json())
    .then(dog => showDog(dog))
})

function toggleGoodBoy(isGoodDog) {
    if (isGoodDog) {
        return "Bad Dog!"
    }
    else {
        return "Good Dog!"
    }
}

function showDog(dog) {
    dogInfo.innerHTML = `<img src=${dog.image}> <h2>${dog.name}</h2>`
    const goodBtn = document.createElement("button")
    goodBtn.innerText = toggleGoodBoy(dog.isGoodDog)
    goodBoy = dog.isGoodDog

    goodBtn.addEventListener("click", e => {
        goodBoy = !goodBoy
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({isGoodDog: goodBoy})
        })
        .then(resp => resp.json())
        .then(json => {
            const goodBtn = document.querySelector("#dog-info > button")
            goodBtn.innerText = toggleGoodBoy(json.isGoodDog)
        })
    })
    dogInfo.appendChild(goodBtn)
}

goodDogFilter.addEventListener("click", e => {
    goodDogFilterValue = !goodDogFilterValue
    goodDogFilter.innerText = goodDogFilterValue ? "Filter good dogs: ON" : "Filter good dogs: OFF"
    const filters = goodDogFilterValue ? "?isGoodDog=true" : ""
    fetch(`http://localhost:3000/pups/${filters}`)
    .then(resp => resp.json())
    .then(dogs => addDogNames(dogBar, dogs))
})