export default () => {
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

	//turn off animated navigation for items menu  if burger visible
	(function () {
		const burger = document.querySelector(".burger")
		if (!burger) return
		if (getComputedStyle(burger).visibility == 'visible') {
			const navItemList = document.querySelectorAll(".menu .wow");
			navItemList.forEach(elem => {
				elem.classList.remove('wow');
			})
		}
	})();

}
