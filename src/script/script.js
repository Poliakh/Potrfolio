
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


function ajaxSelect(wrapElem,card,link){
	let myCards = document.createDocumentFragment();
	let parentCards = document.querySelector(wrapElem);
	let elemCard = parentCards.querySelector(card);

	elemCard.hidden = false;
	let showLoading = function(on){
		let loader = document.querySelector('.loader');
		(on)? loader.classList.add('loaderHide'):loader.classList.remove('loaderHide')
	}
	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			showLoading(false);
			var error = new Error("Ошибка " + response.statusText);
			// error.response = response;
			// throw error;
		}
	}
	function createCard (obj){
		let newCard = elemCard.cloneNode(true);
		newCard.querySelector('.card__page').href = obj.gitpage;
		newCard.querySelector('.card__hub').href = obj.github;
		newCard.style.backgroundImage = `url("${obj.preview}")`;
		return newCard;
	}
	function parseJSON (obj){
		for (let key in obj){
			
			myCards.appendChild(createCard(obj[key]));
		}
		parentCards.appendChild(myCards);	
		return obj
	}
	return {
		load : function(){
					showLoading(true);
					while(parentCards.querySelector(card)){
						parentCards.removeChild(parentCards.querySelector(card))
					}
					fetch(link)
					.then(checkStatus)
					.then(response => response.json())
					.then(parseJSON)
					.catch(function(error) {
						showLoading(false);
						alert('request failed', error)
					})
				}
	}
}
let select = ajaxSelect('.cardWrap', '.card','ololo.json' )
select.load();
