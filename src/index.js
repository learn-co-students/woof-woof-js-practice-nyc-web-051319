document.addEventListener('DOMContentLoaded', function(){
  function fetchDogs(){
    fetch('http://localhost:3000/pups')
      .then(res => res.json())
      .then(json => {
        function createDogs() {
        for (const dog of json) {
          const dogName = document.createElement('span')
          dogName.innerText = dog.name
          dogName.addEventListener('click',
          function(e){
            const dogInfo = document.querySelector('#dog-info')

            //GET DOG IMAGE INTO INFO
            const dogImage = document.createElement('img')
            dogImage.setAttribute('src', `${dog.image}`)

            //GET DOG NAME INTO INFO
            const dogInfoName = document.createElement('h2')
            dogInfoName.innerText = dog.name

            //GET DOG BOOLEAN INTO INFO
            const dogGood = document.createElement('button')
            if (dog.isGoodDog === true) {
              dogGood.innerText = "Good Dog!"
            }
            if (dog.isGoodDog === false) {
              dogGood.innerText = "Bad Dog!"
            }
            dogGood.addEventListener('click', function(e){
              if (dog.isGoodDog === true) {
                dogGood.innerText = "Bad Dog!"

                //PATCH BAD DOG INTO GOOD
                const formData = {
                  "isGoodDog": false,
                }

                const configObj = {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  },
                  body: JSON.stringify(formData)
                }

                fetch("http://localhost:3000/pups" + "/" + `${dog.id}`, configObj)
                  .then(res => res.json())
                  .then(function(object) {
                    console.log(object)
                  })
              }
              if (dog.isGoodDog === false) {
                dogGood.innerText = "Good Dog!"

                //PATCH GOOD DOG INTO BAD
                const formData = {
                  "isGoodDog": true,
                }

                const configObj = {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  },
                  body: JSON.stringify(formData)
                }

                fetch("http://localhost:3000/pups" + "/" + `${dog.id}`, configObj)
                  .then(res => res.json())
                  .then(function(object) {
                    console.log(object)
                  })
              }
            })

            //RESET INFO
            dogInfo.innerHTML = ''

            //APPEND EVERYTHING
            dogInfo.appendChild(dogImage)
            dogInfo.appendChild(dogInfoName)
            dogInfo.appendChild(dogGood)
          })

          const dogList = document.querySelector('#dog-bar')
          dogList.appendChild(dogName)
        }

        //FILTER OUT GOOD DOGS
        const filterButton = document.querySelector('#good-dog-filter')
        filterButton.addEventListener('click',
        function(e){
          if (filterButton.innerText === "Filter good dogs: OFF") {
            filterButton.innerText = "Filter good dogs: ON"
            const onlyGoodDogs = json.filter(dog => dog.isGoodDog === true)
            const dogList = document.querySelector('#dog-bar')
            dogList.innerHTML = ''
            for (const dog of onlyGoodDogs) {
              const goodDogName = document.createElement('span')
              goodDogName.innerText = dog.name
              dogList.appendChild(goodDogName)
              goodDogName.addEventListener('click',
              function(e){

                const dogInfo = document.querySelector('#dog-info')

                //GET DOG IMAGE INTO INFO
                const dogImage = document.createElement('img')
                dogImage.setAttribute('src', `${dog.image}`)

                //GET DOG NAME INTO INFO
                const dogInfoName = document.createElement('h2')
                dogInfoName.innerText = dog.name

                //GET DOG BOOLEAN INTO INFO
                const dogGood = document.createElement('button')
                if (dog.isGoodDog === true) {
                  dogGood.innerText = "Good Dog!"
                }
                if (dog.isGoodDog === false) {
                  dogGood.innerText = "Bad Dog!"
                }
                dogGood.addEventListener('click', function(e){
                  if (dog.isGoodDog === true) {
                    dogGood.innerText = "Bad Dog!"

                    //PATCH BAD DOG INTO GOOD
                    const formData = {
                      "isGoodDog": false,
                    }

                    const configObj = {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                      },
                      body: JSON.stringify(formData)
                    }

                    fetch("http://localhost:3000/pups" + "/" + `${dog.id}`, configObj)
                      .then(res => res.json())
                      .then(function(object) {
                        console.log(object)
                      })
                  }
                  if (dog.isGoodDog === false) {
                    dogGood.innerText = "Good Dog!"

                    //PATCH GOOD DOG INTO BAD
                    const formData = {
                      "isGoodDog": true,
                    }

                    const configObj = {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                      },
                      body: JSON.stringify(formData)
                    }

                    fetch("http://localhost:3000/pups" + "/" + `${dog.id}`, configObj)
                      .then(res => res.json())
                      .then(function(object) {
                        console.log(object)
                      })
                  }
                })

                dogInfo.innerHTML = ''
                dogInfo.appendChild(dogImage)
                dogInfo.appendChild(dogInfoName)
                dogInfo.appendChild(dogGood)
              })
            }
          }
          else {
            filterButton.innerText = "Filter good dogs: OFF"
            const dogList = document.querySelector('#dog-bar')
            dogList.innerHTML = ''
            createDogs()
          }
        })

      }
      createDogs()
    })
  }
  fetchDogs()
})
