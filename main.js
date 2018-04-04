document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(){

	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateform(siteName, siteURL)){

		return false;

	}

	var bookmark = {
		name: siteName,
		URL: siteURL
	};

	if(localStorage.getItem('bookmarks') === null){

		var bookmarks = [];
		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else{

		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	document.getElementById('myform').reset();

	fetchbookmarks();

}

function deleteBookmark(url){

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){

		if(bookmarks[i].URL == url){

			bookmarks.splice(i, 1);

		}

	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchbookmarks();

}

function fetchbookmarks(){

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bookmarksresults = document.getElementById('bookmarksresults');

	bookmarksresults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){

		var name = bookmarks[i].name;
		var url = bookmarks[i].URL;

		bookmarksresults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
										'</h3>'+
										'</div>';

	}

}

function validateform(siteName, siteURL) {

	if(!siteName || !siteURL){

		alert('Please fill the form');
		return false;

	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){

		alert('Please enter a valid URL');
		return false;

	}

	return true;

}