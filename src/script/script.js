
// --Menu burger start--
let treeLine = document.querySelector('.bline')
document.querySelector('body').addEventListener('mouseup', menuHover)
function menuHover(event){
	if(event.target.closest('.burger') || event.target.closest('.menu') ){
		document.querySelector('.burger').classList.toggle('burgerHover');
		document.querySelector('.bline').classList.toggle('burgerLineAnimate');
		document.querySelector('.menu').classList.toggle('menuHover');
	}
	if(!event.target.closest('.burger')){
		document.querySelector('.burger').classList.remove('burgerHover');
		document.querySelector('.bline').classList.remove('burgerLineAnimate');
		document.querySelector('.menu').classList.remove('menuHover');
	}
}
// --Menu burger end--
//-------------------------------------------------------------------


function AjaxSelect(wrapElem,card){
	let myCards = document.createDocumentFragment();
	let parentCards = document.querySelector(wrapElem);
	let elemCard = parentCards.querySelector(card);

	let showLoading = (on)=>{
		let loader = document.querySelector('.loader');
		(on)? loader.classList.remove('loaderHide'):loader.classList.add('loaderHide')
	}
	let checkStatus = (response)=>{
		if (response.ok) {
			return response.json()
		}else{
			showLoading(false);
			let error = new Error("Ошибка " + response.statusText);
			error.response = response;
			throw error;
		}
	}
	let createCard = (obj)=>{
		let newCard = elemCard.cloneNode(true);
		newCard.hidden = false;
		newCard.querySelector('.card__page').href = obj.gitpage;
		newCard.querySelector('.card__hub').href = obj.github;
		newCard.style.backgroundImage = `url("${obj.preview}")`;
		return newCard;
	}
	let parseJSON = (obj)=>{
		for (let key in obj){
			myCards.appendChild(createCard(obj[key]));
		}
			showLoading(false);
			parentCards.appendChild(myCards);	
	}
	this.load = (url)=>{
		showLoading(true);
		while(parentCards.querySelector(card)){
			parentCards.removeChild(parentCards.querySelector(card))
		}
		fetch(url)
		.then(checkStatus)
		.then(parseJSON)
		.catch((error)=>{
			showLoading(false);
			alert('request failed', error)
		})
	}
}

let ajaxSelect = new AjaxSelect('.cardWrap', '.card')
ajaxSelect.load('ololo.json');
