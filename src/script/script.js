"use strict";
import burger from './modules/burger'
import CardListCreator from './modules/card-list-creator'
import copyByClick from './modules/copy-by-click'
// import createLinkToGoogleSheet from './modules/create-link-googlesheet'
import gotoloc from './modules/counter'
import {addDelayAnimation} from './modules/addDelayAnimation'
import WOW from 'wow.js'
//= modules/create-link-googlesheet.js
// createLinkToGoogleSheet()

burger()
copyByClick()
gotoloc()


if(document.querySelector('.cardWrap')){
	const createList = new CardListCreator('.cardWrap', '.card')
	createList.load('./data/list_my_works.json')
}

new WOW().init();

addDelayAnimation('.social', '.fadeInUp', 0.2, 0);
addDelayAnimation('.contactlist', '.fadeInRight', 0.2, 0.8);
addDelayAnimation('.menu', '.wow', 0.2, 0.5);
addDelayAnimation('.cardWrap', '.card', 0.2, 0.5);
