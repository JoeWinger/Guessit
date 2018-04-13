let API_URL = 'https://i.reddit.com/r/';

var DEFAULT_SUBS = ['art', 'askreddit', 'aww', 'books', 'earthporn', 'food',
				'funny', 'gadgets', 'gifs', 'history', 'internetisbeautiful',
				'jokes', 'mildlyinteresting', 'news', 'oldschoolcool', 'photoshopbattles',
				'pics', 'science', 'showerthoughts', 'space', 'sports', 'videos', 'worldnews'];

for(let i = 0; i < DEFAULT_SUBS.length; i++) {
	console.log(DEFAULT_SUBS[i]);
	API_URL = API_URL.concat("+" + DEFAULT_SUBS[i]);
}
API_URL = API_URL.concat("/hot.json?t=day&limit=" + DEFAULT_SUBS.length*10);

$.getJSON(API_URL, (res) => {
	console.log(res);
	var postTitle = res.data.children[0].data.title;
	
	$('#post-title').text(postTitle);
});