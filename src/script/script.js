let mylist = document.createDocumentFragment();
let parentCards = document.querySelector('.cardWrap');
let elemCard = parentCards.querySelector(".card");
parentCards.removeChild(elemCard);
elemCard.hidden = false;

let createCard = (obj) => {
	let newCard = elemCard.cloneNode(true);
	newCard.querySelector('.card__page').href = obj.gitpage;
	newCard.querySelector('.card__hub').href = obj.github;
	newCard.style.backgroundImage = `url("${obj.preview}")`;
	return newCard;
}
// parentCards
let parsObj = obj =>{
	for (let key in obj){
		mylist.appendChild(createCard(obj[key]));
	}
	parentCards.appendChild(mylist);	
}

fetch('ololo.json')
.then(response => response.json())
.then(parsObj)
.catch( alert );

