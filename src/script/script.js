let treeLine = document.querySelector('.bline')

document.querySelector('body').addEventListener('mouseup', menuHover)
// document.querySelector('body').addEventListener('click', menuHover)
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
/*
body.addEventListener('mouseover', animateBurger);

 function animateBurgerOver(event){
	if(event.target.closest('.menu') || event.target.closest('.burger')){
		// console.log(event.target);
		
		treeLine.classList.add('burgeractive');
	}
}
	console.log(`out with ${event.target}`);
	if(event.target.closest('.menu') || event.target.closest('.burger')){
			
		// window.setTimeout(function(){
			console.log('hi');
		// 	treeLine.classList.remove('burgeractive');
		// },1500);
	}
 */




// create card -- start--
let mylist = document.createDocumentFragment();
let parentCards = document.querySelector('.cardWrap');
let elemCard = parentCards.querySelector('.card');
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
// create card -- end--


