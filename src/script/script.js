// --Burger--
(function(){
	let burgerButton = document.querySelector('.burger');
	let burgerLine = document.querySelector('.bline');
	let navMenu = document.querySelector('.menu');
	
	document.querySelector('body').addEventListener('mouseup', menuHover);
	function menuHover(event){
		if(event.target.closest('.burger') || event.target.closest('.menu') ){
			burgerButton.classList.toggle('burgerActive');
			burgerLine.classList.toggle('burgerLineAnimate');
			navMenu.classList.toggle('menuHover');
		}
		if(!event.target.closest('.burger')){
			burgerButton.classList.remove('burgerActive');
			burgerLine.classList.remove('burgerLineAnimate');
			navMenu.classList.remove('menuHover');
		}
	}
})()
// --burger end--

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
		newCard.querySelector('.descript__page').href = obj.gitpage;
		newCard.querySelector('.descript__hub').href = obj.github;
		newCard.querySelector('.descript__head').innerText = obj.header;
		newCard.querySelector('.descript__text').innerHTML = obj.descript;
		newCard.style.backgroundImage = `url("${obj.preview}")`;
		// createListStack();
		(function createListStack(){
			try {
				let ta = newCard.querySelectorAll('.iconSprite use') ;
			console.log(ta[0].href.animVal);
			//img/stack_sprite.svg#resp
			} catch (error) {
				console.error('error');
				
			}
		})()

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
			parentCards.removeChild(parentCards.querySelector(card));
		}
		fetchAsync = async()=>{
			try {
				let response = await fetch(url);
				let obj = await checkStatus(response)
				await parseJSON(obj);
				await addDelayAnimation('.cardWrap','.card',0.2,0.5);
			} catch (error) {
				showLoading(false);
				alert('request failed', error)
			}
		}
		fetchAsync();
	}
}

let ajaxSelect = new AjaxSelect('.cardWrap', '.card')
ajaxSelect.load('data.json');

//-------------------------------------<--



// look it https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808
// 
//--wow--
new WOW().init();

function addDelayAnimation(parentCLass,targetClass,incremdelay,delay){
	let listIcon = document.querySelector(parentCLass).querySelectorAll(targetClass);
	listIcon.forEach(element => {
		delay+= incremdelay;
		element.getAttribute('data-wow-delay');
			element.dataset.wowDelay = delay + 's';
		});
}
addDelayAnimation('.social','.fadeInUp',0.2, 0);
addDelayAnimation('.contactlist','.fadeInRight',0.2,0.8);
addDelayAnimation('.menu','.wow',0.2,0.5);
addDelayAnimation('.cardWrap','.card',0.2,0.5);
//turn off animated navigation for items menu  if burger visible
(function(){
	let burger = document.querySelector(".burger")
	if(getComputedStyle(burger).visibility == 'visible'){
		let navItemList = document.querySelectorAll(".menu .wow");
		navItemList.forEach(elem =>{
			elem.classList.remove('wow');
		})
	}
})();
