//Copy by click
export default () => {
	document.querySelector('body').addEventListener('click', function (event) {
		copyText('.details__icon', '.details__cont');
	});

	// function copyText (even, '.iconSprite', '.nameId')
	function copyText(clickElem, classTargetCopyText) {
		let target = event.target.closest(clickElem);
		if (target && target.matches(clickElem)) {
			let copyText = target.parentElement.querySelector(classTargetCopyText);
			if (document.selection) {
				let range = document.createTextRange();
				range.moveToElementText(copyText);
				range.select().createTextRange();
				document.execCommand("copy");
			} else if (window.getSelection) {
				let range = document.createRange();
				range.selectNode(copyText);
				console.log(range.startContainer.innerText);
				window.getSelection().removeAllRanges(); // clear current selection
				window.getSelection().addRange(range); // to select text
				document.execCommand("copy");
				window.getSelection().removeAllRanges(); // clear current selection
			}
		}
	}
}
