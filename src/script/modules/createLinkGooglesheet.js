const createLinkToGoogleSheet = (shareLink = '', listNumber = 1) => {
	const idRegex = /\/d\/(.*)\//;
	try {
		const idSheet = shareLink.match(idRegex)[1];
		return `https://spreadsheets.google.com/feeds/list/${idSheet}/${listNumber}/public/values?alt=json`
	} catch (error) {
		console.error('link for sheet must be "https:/*/d/*');
	};
};

// const url = createLinkToGoogleSheet(urlOriginal);
