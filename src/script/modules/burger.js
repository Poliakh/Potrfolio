const burger = () => {
	const wrapMenuNavigation = document.querySelector('.navbar');
	document.querySelector('body').addEventListener('click', toggleMenu);

	function toggleMenu(event) {
		if (event.target.closest('.burger') || event.target.closest('.menu')) {
			wrapMenuNavigation.classList.toggle('navbar-active');
		}
		if (!event.target.closest('.burger')) {
			wrapMenuNavigation.classList.remove('navbar-active');
		}
	}
}

