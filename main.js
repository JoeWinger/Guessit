var DEFAULT_SUBS = ['art', 'askreddit', 'aww', 'books', 'earthporn', 'food',
				'funny', 'gadgets', 'gifs', 'history', 'internetisbeautiful',
				'jokes', 'mildlyinteresting', 'news', 'oldschoolcool', 'photoshopbattles',
				'pics', 'science', 'showerthoughts', 'space', 'sports', 'videos', 'worldnews'];

let API_URL = buildURL(DEFAULT_SUBS).concat("/hot.json?t=day&limit=" + DEFAULT_SUBS.length*10);

var USABLE_POSTS = {};

var CURRENT_POST;

function buildURL(subList) {
	let url = 'https://i.reddit.com/r/';
	for(let i = 0; i < subList.length; i++) {
		url = url.concat("+" + subList[i]);
	}
	return url;
}

$.getJSON(API_URL, (res) => {
	USABLE_POSTS = res.data.children;
	showNewPost();
});

function getPost() {
	let r = Math.floor(Math.random() * USABLE_POSTS.length);
	let post = USABLE_POSTS[r];
	USABLE_POSTS.splice(r, 1);
	CURRENT_POST = post.data;
	return post.data;
}

function showNewPost() {
	const post = getPost();
	$('#post-title').text(post.title);
	if(post.thumbnail != 'self' && post.thumbnail != 'default') $('#post-thumbnail').attr('src', post.thumbnail);
	console.log(post);
}

$('#btn-guess').click(() => {
	if(CURRENT_POST.subreddit.toLowerCase() == $('#guess').val().toLowerCase()) {
		showNewPost();
	} else {
	}
});