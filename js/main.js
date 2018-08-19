var DEFAULT_SUBS = ['art', 'askreddit', 'aww', 'books', 'earthporn', 'food',
	'funny', 'gadgets', 'gifs', 'history', 'internetisbeautiful',
	'jokes', 'mildlyinteresting', 'news', 'oldschoolcool', 'photoshopbattles',
	'pics', 'science', 'showerthoughts', 'space', 'sports', 'videos', 'worldnews'],
	USABLE_POSTS = {}, CURRENT_POST, points = 0, wrongs = 0;


let API_URL = buildURL(DEFAULT_SUBS).concat("/hot.json?t=day&limit=" + DEFAULT_SUBS.length * 10);
$('#sublist').html(buildAutocompleteList(DEFAULT_SUBS));
//This codes run asyncronously in the background to grab data from Reddit
$.getJSON(API_URL, (res) => {
	USABLE_POSTS = res.data.children;
	showNewPost();
});
$('#btn-guess').click(() => { checkGuess($('#guess').val()); });
$("#guess").keyup((e) => { if (e.keyCode === 13) checkGuess($('#guess').val()); });

/*
 * Utilities
 */
function checkGuess(guess) {
	let correctGuess = CURRENT_POST.subreddit.toLowerCase();
	guess = guess.toLowerCase();

	if (guess == correctGuess) {
		$('#guess').removeClass('incorrect').removeClass('correct').addClass('correct');
		points++;
		wrongs = 0;
		showNewPost();
	} else {
		$('#guess').removeClass('correct').removeClass('incorrect').addClass('incorrect');
		points--;
		wrongs++;
		if (wrongs == 3) {
			wrongs = 0;
			showNewPost();
		}
	}

	$('#points').text(points);
	$('#guess').val('');
}
function buildURL(subList) {
	let url = 'https://i.reddit.com/r/';
	for (let i = 0; i < subList.length; i++) {
		url = url.concat("+" + subList[i]);
	}
	return url;
}
function buildAutocompleteList(optionList) {
	let o = '';
	for (let i = 0; i < optionList.length; i++) {
		o += '<option value="' + optionList[i] + '" />';
	}
	return o;
}
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
	$('#post-title').text(post.title);                         // Set title
	$('#post-thumbnail').attr('src', post.thumbnail);          // Set thumbnail
	$('#post-author').text('/u/' + post.author);               // Set author
	$('#post-comments').text(post.num_comments + ' comments'); // Set # of comments
	post.domain.startsWith('self.') ? $('#post-link').text('self.reddit') : $('#post-link').text(post.domain); // Set post domain (if applicable)
}