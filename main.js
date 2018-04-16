var DEFAULT_SUBS = ['art', 'askreddit', 'aww', 'books', 'earthporn', 'food',
				'funny', 'gadgets', 'gifs', 'history', 'internetisbeautiful',
				'jokes', 'mildlyinteresting', 'news', 'oldschoolcool', 'photoshopbattles',
				'pics', 'science', 'showerthoughts', 'space', 'sports', 'videos', 'worldnews'];

let API_URL = buildURL(subList);

function buildURL(subList) {
	const url = 'https://i.reddit.com/r/';
	for(let i = 0; i < subList.length; i++) {
		url = url.concat("+" + subList[i]);
	}
	return url;
}

API_URL = API_URL.concat("/hot.json?t=day&limit=" + DEFAULT_SUBS.length*10);

$.getJSON(API_URL, (res) => {
	console.log(res);
	var postTitle = res.data.children[0].data.title;
	
	$('#post-title').text(postTitle);
});

