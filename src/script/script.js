"use strict";
import burger from './modules/burger'
import CardListCreator from './modules/card-list-creator'
import copyByClick from './modules/copy-by-click'
import createLinkToGoogleSheet from './modules/create-link-googlesheet'

//= modules/create-link-googlesheet.js
burger();
copyByClick();
createLinkToGoogleSheet();

const createList = new CardListCreator('.cardWrap', '.card')
createList.load('https://docs.google.com/spreadsheets/d/1ki0LZ0At_vauhtubYrQP64AvXBv7Li-qcHzFz9wR0fs/edit?usp=sharing')

new WOW().init();

function addDelayAnimation(parentCLass, targetClass, incrementdelay, delay) {
	const listIcon = document.querySelector(parentCLass).querySelectorAll(targetClass);
	listIcon.forEach(element => {
		delay += incrementdelay;
		element.getAttribute('data-wow-delay');
		element.dataset.wowDelay = delay + 's';
	});
}
addDelayAnimation('.social', '.fadeInUp', 0.2, 0);
addDelayAnimation('.contactlist', '.fadeInRight', 0.2, 0.8);
addDelayAnimation('.menu', '.wow', 0.2, 0.5);
addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
