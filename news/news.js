$(document).ready(function() {
	reddit();
	designerNews();
});

function reddit(){
	// establish a source
	var domain = "https://pay.reddit.com";
	// define the subreddits
	var subreddits = [ "news", "worldnews", "science", "askscience", "technology", "history", "socialism", "depthhub", "bestof", "truereddit"];
	// pick the top posts this week, and only get three stories
	var options = '/top.json?jsonp=?&limit=3&sort=top&t=week';
	// create containers each subreddit to maintain the correct order
	$.each(subreddits, function(i,item) {
		$('#reddit').append('<div class="' + item + '"><div class="loading-subreddit">Loading <em>' + item + '</em>...</div></div>');
	});
	// hide the generic loading text
	$('#reddit .loading').hide();
	// get the data
	$.each(subreddits, function(i,subreddit) {
		$.getJSON(domain + '/r/' + subreddit + options).done(function(data) {
			$.each(data.data.children, function(i,item) {
				$('#reddit .' + subreddit).append('<article>\
						<a href="' + item.data.url + '" class="story">' + item.data.title + '</a>\
						<a href="' + domain + item.data.permalink + '" class="comments">' + item.data.num_comments + ' comments</a>\
					</article>');
			});
			$('#reddit .' + subreddit + ' .loading-subreddit').hide();
		});
	});
}

function designerNews(){
	// define url
	var dnURL = 'https://api-news.layervault.com/api/v1/stories?client_id=770e8aef60ccf9f33e1f483af08f4fdc4ecc9b03de19273f66f657fd1800fefc';
	// get the data at that url
	$.getJSON(dnURL).done(function(data) {
		// append each to the dom
		$.each(data.stories, function(i,item) {
			// layervault’s api returns a bogus comment page url; fix it
			var commentPageURL = item.site_url.replace("https://api-news.layervault.com/", "https://news.layervault.com/");
			// build the story
			$('#dn').append('<article>\
					<a href="' + item.url + '" class="story">' + item.title + '</a>\
					<a href="' + commentPageURL + '" class="comments">' + item.comment_count + ' comments</a>\
				</article>');
		});
		// done
		$('#dn .loading').hide();
	});
}