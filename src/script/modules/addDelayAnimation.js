export function addDelayAnimation(parentCLass, targetClass, incrementdelay, delay) {
	const parent = document.querySelector(parentCLass)
	if(!parent)return 
	const listIcon = parent.querySelectorAll(targetClass)
	listIcon.forEach(element => {
		delay += incrementdelay;
		element.getAttribute('data-wow-delay');
		element.dataset.wowDelay = delay + 's';
	});
}
