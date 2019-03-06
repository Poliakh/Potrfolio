console.log("Hello World");
let list = '';
let parentCards = document.querySelector('.cardWrap')
let elemCard = parentCards.querySelector(".card");
parentCards.removeChild(elemCard);
elemCard.hidden = false;
// console.log(elemCard);



// console.log(elemCard.querySelector('.card__page').href);

let createCard = obj => {
	// console.log(obj.gitpage);
	
	elemCard.querySelector('.card__page').href = obj.gitpage;
	elemCard.querySelector('.card__hub').href = obj.github;
	elemCard.style.backgroundImage = `url("${obj.preview}")`;
	
}
// parentCards
let ololo = obj =>{
	
	for (let key in obj){
		createCard(obj.duhoot)
	}
}
parentCards.append(elemCard);

fetch('ololo.json')
.then(response => response.json())
.then(ololo)
