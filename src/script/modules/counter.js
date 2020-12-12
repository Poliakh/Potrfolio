export default () => {
	const count = document.getElementById('count');
	if(!count)return 
	let val = count.innerText
	setInterval(() => {
		if(val !== 0){
			count.innerText = --val
		}else{
		window.location = 'http://portfolio.polyah.zzz.com.ua/'
			console.log('gp to');
		}
	}, 1000);
}