var DEFAULT_SUBS = ['art', 'askreddit', 'aww', 'books', 'earthporn', 'food',
				'funny', 'gadgets', 'gifs', 'history', 'internetisbeautiful',
				'jokes', 'mildlyinteresting', 'news', 'oldschoolcool', 'photoshopbattles',
				'pics', 'science', 'showerthoughts', 'space', 'sports', 'videos', 'worldnews'];

let API_URL = buildURL(DEFAULT_SUBS).concat("/hot.json?t=day&limit=" + DEFAULT_SUBS.length*10);

$('#sublist').html(buildAutocompleteList(DEFAULT_SUBS));
function buildAutocompleteList(optionList) {
	let o = '';
	for(let i = 0; i < optionList.length; i++) {
		o += '<option value="' + optionList[i] + '" />';
	}
	return o;
}

var USABLE_POSTS = {};

var CURRENT_POST;

var points = 0;
var wrongs = 0;

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
	console.log(post.data);
	return post.data;
}

function showNewPost() {
	const post = getPost();
	$('#post-title').text(post.title);
	if(post.thumbnail != 'self' && post.thumbnail != 'default') $('#post-thumbnail').attr('src', post.thumbnail);
	else $('#post-thumbnail').attr('src', '');
	$('#post-author').text('/u/' + post.author);
	$('#post-comments').text(post.num_comments + ' comments');
	if(post.domain.startsWith('self.')) $('#post-link').text('self.reddit');
	else $('#post-link').text(post.domain);
	$('#points').text(points);
	//console.log(post);
}

$('#btn-guess').click(() => {
	if(CURRENT_POST.subreddit.toLowerCase() == $('#guess').val().toLowerCase()) {
		$('#guess').removeClass('incorrect').removeClass('correct').addClass('correct');
		points++;
		wrongs = 0;
		showNewPost();
	} else {
		$('#guess').removeClass('correct').removeClass('incorrect').addClass('incorrect');
		points--;
		$('#points').text(points);
		wrongs++;
		if(wrongs == 3) {wrongs = 0; showNewPost();}

	}

	$('#guess').val('');
});

$("#guess").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btn-guess").click();
    }
});

	$('#guess').autocomplete({
		hints: DEFAULT_SUBS,
		buttonText: "Guuess"
	});