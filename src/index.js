const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const filter = document.querySelector("#good-dog-filter")
const dogs = []

filter.addEventListener('click', function(e) {
    let textArray = e.target.innerText.split(" ")
    if (textArray[3] === "OFF") {
        e.target.innerText = "Filter good dogs: ON"
        dogFetch()
    }
    else {
        e.target.innerText = "Filter good dogs: OFF"
        dogFetch()
    }
})

function dogFetch() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => dogFilter(json))
}

function dogFilter(json) {
    let textArray = filter.innerText.split(" ")
    dogBar.innerHTML = ""
    if (textArray[3] === "ON") {
        json.forEach(element => {
            if (element.isGoodDog === true) {
                dogBar.innerHTML += `<span>${element.name}</span>`
            }
        })
    }
    else {
        json.forEach(element => {
            dogBar.innerHTML += `<span>${element.name}</span>`
        })
    }
}

dogFetch()


function dogJSON() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => json.forEach(element => {
        dogs.push(element)
    }))
}

dogJSON()

dogBar.addEventListener('click', function(e) {
    dogs.forEach(element => {
        let isGood = ""
        if (element.isGoodDog === true) {
            isGood = "Good Dog!"
        }
        else {
            isGood = "Bad Dog!"
        }
        if (element.name === e.target.innerText) {
            dogInfo.innerHTML += `
                <img src=${element.image}>
                <h2>${element.name}</h2>
                <button>${isGood}</button>
                `
        }
    })
})

dogInfo.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        dogs.forEach(element => {
            element.isGoodDog = !element.isGoodDog
            if (element.name === e.target.previousElementSibling.innerText) {
                fetch(`http://localhost:3000/pups/${element.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "isGoodDog": element.isGoodDog
                    })
                })
                .then(resp => resp.json())
                .then(json => {
                    if (json.isGoodDog === true) {
                        e.target.innerText = "Good Dog!"
                    }
                    else {
                        e.target.innerText = "Bad Dog!"
                    }
                })
            }
        })
    }
})