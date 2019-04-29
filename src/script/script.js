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




function ajaxSelect(id) {
	var element = document.getElementById(id)

	var onLoaded = function(data) {
		var i=0
		for(var key in data) {
			var label = data[key]
			element.options[i++] = new Option(label, key)
		}
	}

	var onLoadError = function(error) {
		var msg = "Ошибка "+error.errcode
		if (error.message) msg = msg + ' :'+error.message
		alert(msg)
	}

	var showLoading = function(on) {
		element.disabled = on
	}

	var onSuccess = function(data) {
		if (!data.errcode) {
			onLoaded(data)
			showLoading(false)
		} else {
			showLoading(false)
			onLoadError(data)
		}
	}
    
    
    var onAjaxError = function(xhr, status){
        showLoading(false)
        var errinfo = { errcode: status }
        if (xhr.status != 200) {
            // может быть статус 200, а ошибка
            // из-за некорректного JSON
            errinfo.message = xhr.statusText
        } else {
            errinfo.message = 'Некорректные данные с сервера'
        }
        onLoadError(errinfo)
    }

    
    return {
        load: function(url) {
            showLoading(true)

            while (element.firstChild) {
                element.removeChild(element.firstChild)
            }

            $.ajax({ // для краткости - jQuery
                url: url,
                dataType: "json",
                success: onSuccess,
                error: onAjaxError,
                cache: false
            })
        }
    }
}
