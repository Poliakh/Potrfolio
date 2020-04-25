"use strict";

//= modules/burger.js
//= modules/cardList.js
//= modules/copyByClick.js
burger();

class CardList {
	constructor(wrapElem, card){
		this.card = card;
		this.myCards = document.createDocumentFragment();
		this.parentCards = document.querySelector(wrapElem);
		this.elemCard = this.parentCards.querySelector(card);
		
	};

	_showLoading = (state = true) => {
		let loader = document.querySelector('.loader');
		(state) ? loader.classList.remove('loaderHide') : loader.classList.add('loaderHide')
	};
	
	createLinkToGoogleSheet = (shareLink = '', listNumber = 1) => {
		const idRegex = /\/d\/(.*)\//;
		try {
			const idSheet = shareLink.match(idRegex)[1];
			return `https://spreadsheets.google.com/feeds/list/${idSheet}/${listNumber}/public/values?alt=json`
		} catch (error) {
			console.error('link for sheet must be "https:/*/d/*');
		};
	};

	createListIconStackTechnology = (obj, newCard) => {
		const listStack = obj.stack;
		const listIcon = newCard.querySelectorAll('[data-id-svg]');
		//Mark the necessary SVG elements in the map tree
		for (let i = 0; i < listStack.length; i++) {
			for (let index = 0; index < listIcon.length; index++) {
				if (listStack[i] == listIcon[index].dataset.idSvg) {
					listIcon[index].dataset.idSvg = 'is';
				}
			}
		}
		const parent = newCard.querySelector('.card__stack');
		//Remove unnecessary items
		for (let index = 0; index < listIcon.length; index++) {
			if (listIcon[index].dataset.idSvg != 'is') {
				parent.removeChild(listIcon[index]);
			}
		}
		return newCard;
	};

	createCard = (obj) => {
		const newCard = this.elemCard.cloneNode(true);
		newCard.hidden = false;
		newCard.querySelector('.descript__page').href = obj.gitpage;
		newCard.querySelector('.descript__hub').href = obj.github;
		newCard.querySelector('.descript__head').innerText = obj.header;
		newCard.querySelector('.descript__text').innerHTML = obj.descript;
		newCard.style.backgroundImage = `url("${obj.preview}")`;
		
		this.createListIconStackTechnology(obj,newCard)

		return newCard;
	};

	_getObject = async (response) => {
		if (response.ok) {
			const data = (await response.json()).feed.entry[0].gsx$myjson.$t;
			return JSON.parse(data);
		} else {
			showLoading(false);
			const error = new Error("Ошибка " + response.statusText);
			error.response = response;
			throw error;
		};
	};

	_parseJSON = (obj) => {
		for (let key in obj) {
			if(obj[key].display){
				this.myCards.appendChild(this.createCard(obj[key]));
			};
	
		};
		this._showLoading(false);
		this.parentCards.appendChild(this.myCards);
	};

	load = (url) => {
		this._showLoading(true);
		//remove all children
		while (this.parentCards.querySelector(this.card).length > 0) {
			this.parentCards.removeChild(this.parentCards.querySelector(this.card));
		};

		const link = this.createLinkToGoogleSheet(url);
			try {
				fetch(link)
				.then((data) => {
					return this._getObject(data)
				})
				.then((obj) => {
					this._parseJSON(obj);
					console.log('obj: ', obj);
					addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
				})
				
			} catch (error) {
				this._showLoading(false);
				console.error('request failed ', error);
				//вывести текст ошибки
			};
	};
/* 
	load = async (url) => {
		this._showLoading(true);
		
		while (this.parentCards.querySelector(this.card).length > 0) {
			this.parentCards.removeChild(this.parentCards.querySelector(this.card));
		};
		const link = this.createLinkToGoogleSheet(url);
			try {
				const response = await fetch(link)
				const obj = await this._getObject(response);
				this._parseJSON(obj);
				addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
			} catch (error) {
				this._showLoading(false);
				console.error('request failed ', error);
				//вывести текст ошибки
			};
	}; */

};
const createList = new CardList('.cardWrap', '.card')
createList.load('https://docs.google.com/spreadsheets/d/1ki0LZ0At_vauhtubYrQP64AvXBv7Li-qcHzFz9wR0fs/edit?usp=sharing')
/* 
const urlOriginal = ;
const url = createLinkToGoogleSheet(urlOriginal);

let res = fetch(url)
	.then ((data) => {
		if(data.ok){
			return data.json();
		}
	})
	.then ((data) => {
		data = data.feed.entry[0].gsx$myjson.$t;
		data = JSON.parse(data);
		console.log((data));
		
	})
 */
//----------------------------------------------------------------------

/*

function AjaxSelect(wrapElem, card) {
	let myCards = document.createDocumentFragment();
	let parentCards = document.querySelector(wrapElem);
	let elemCard = parentCards.querySelector(card);

	let showLoading = (on) => {
		let loader = document.querySelector('.loader');
		(on) ? loader.classList.remove('loaderHide') : loader.classList.add('loaderHide')
	}

	let checkStatus = (response) => {
		if (response.ok) {
			return response.json()
		} else {
			showLoading(false);
			let error = new Error("Ошибка " + response.statusText);
			error.response = response;
			throw error;
		}
	}

	let createCard = (obj) => {
		let newCard = elemCard.cloneNode(true);
		newCard.hidden = false;
		newCard.querySelector('.descript__page').href = obj.gitpage;
		newCard.querySelector('.descript__hub').href = obj.github;
		newCard.querySelector('.descript__head').innerText = obj.header;
		newCard.querySelector('.descript__text').innerHTML = obj.descript;
		newCard.style.backgroundImage = `url("${obj.preview}")`;
		
		(function createListStack() {
			let listStack = obj.stack;
			let listIcon = newCard.querySelectorAll('[data-id-svg]');
			//Mark the necessary SVG elements in the map tree
			for (let i = 0; i < listStack.length; i++) {
				for (let index = 0; index < listIcon.length; index++) {
					if (listStack[i] == listIcon[index].dataset.idSvg) {
						listIcon[index].dataset.idSvg = 'is';
					}
				}
			}
			let parent = newCard.querySelector('.card__stack');
			//Remove unnecessary items
			for (let index = 0; index < listIcon.length; index++) {
				if (listIcon[index].dataset.idSvg != 'is') {
					parent.removeChild(listIcon[index]);
				}
			}
		})()

		return newCard;
	};

	let parseJSON = (obj) => {
		for (let key in obj) {
			myCards.appendChild(createCard(obj[key]));
		}
		showLoading(false);
		parentCards.appendChild(myCards);
	}

	this.load = (url) => {
		showLoading(true);
		while (parentCards.querySelector(card)) {
			parentCards.removeChild(parentCards.querySelector(card));
		}
		fetchAsync = async () => {
			try {
				let response = await fetch(url);
				let obj = await checkStatus(response)
				await parseJSON(obj);
				await addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
			} catch (error) {
				showLoading(false);
				// alert('request failed', error)
			}
		}
		fetchAsync();
	}
}

let ajaxSelect = new AjaxSelect('.cardWrap', '.card')
ajaxSelect.load('data.json');

*/

//-------------------------------------<--



// look it https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808
// 
//--wow--
new WOW().init();

function addDelayAnimation(parentCLass, targetClass, incremdelay, delay) {
	let listIcon = document.querySelector(parentCLass).querySelectorAll(targetClass);
	listIcon.forEach(element => {
		delay += incremdelay;
		element.getAttribute('data-wow-delay');
		element.dataset.wowDelay = delay + 's';
	});
}
addDelayAnimation('.social', '.fadeInUp', 0.2, 0);
addDelayAnimation('.contactlist', '.fadeInRight', 0.2, 0.8);
addDelayAnimation('.menu', '.wow', 0.2, 0.5);
addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
//turn off animated navigation for items menu  if burger visible
(function () {
	let burger = document.querySelector(".burger")
	if (getComputedStyle(burger).visibility == 'visible') {
		let navItemList = document.querySelectorAll(".menu .wow");
		navItemList.forEach(elem => {
			elem.classList.remove('wow');
		})
	}
})();

// const list = document.getElementById('ul');
// list.removeChild(list.children[0])
// console.log(list.children);
