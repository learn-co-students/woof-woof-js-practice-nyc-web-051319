//DOM variables
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
document.addEventListener('DOMContentLoaded', function(e){
	//DOG BAR EVENT LISTENER
	dogInfo.addEventListener('click', function(e){
		if(e.target.dataset.id === "good-dog") {
			fetch(`http://localhost:3000/pups/${e.target.id}`, {
				method: "PATCH",
				headers: {'Content-Type': 'application/json', Accept: 'application/json'},
				body: JSON.stringify({isGoodDog: true})
			})//fetch end
				//
				// .then(res => res.json())
				// .then(pup => )
		}
	})
	dogBar.addEventListener('click',function(e){
		const dogId = e.target.id
		fetch(`http://localhost:3000/pups/${dogId}`)
			.then(res => res.json())
			.then(pup =>
				dogInfo.innerHTML =
					`
							<img src=${pup.image}>
							<h2>${pup.name}</h2>
							<button data-id="good-dog" id="${pup.id}">Good Dog!</button>
					`

			)

	})


	console.log('hi there Will!')
	//FETCH GET
	fetch('http://localhost:3000/pups')
	.then(res => res.json())
	.then(pups => pups.forEach(function(pup){
	dogBar.innerHTML +=
		`
		<span class="dog" id="${pup.id}">${pup.name}</span>

		`
}))



})
