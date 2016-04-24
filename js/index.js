$(document).ready(function() {
	$("#searchButton").on('click', function(e) {
		//Prevents reloading of page on click
		e.preventDefault();
		//Switches button color to grey default to show it's loading. After completion it returns to blue.
		$(this).toggleClass("btn-primary");
		//Switches value to loading to show loading
		$(this).val("Loading");
		//Empties the search results after each search
		$('#searchResults').empty();
		//Makes the button not clickable until completion of ajax
		$(this).attr("disabled", true);
		//Creates a variable of the text that was put into the search bar
		var wordsToSearch = $('#searchText').val();
		var cb = '&callback=?';
		console.log(wordsToSearch);
		var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
		//My ajax call to wikipedia
		$.ajax({
			url: api + wordsToSearch + cb,
			//Was getting CORS errors so I retrieved JSONP instead
			dataType: 'jsonp',
			type: 'GET',
			success: function(data) {
				//var results = data.query.pages;
				//console.log(results);
				$.each(data.query.pages,function(i, page) {
					var resultsDiv = "<a href='http://en.wikipedia.org/?curid=" + page.pageid + "> <div> <h4>" + page.title + "</h4> <li>" + page.extract + "</li></div></a>";
					$('#searchResults').append(resultsDiv);
				});
			},
			//Function called at completion to change back color, text, and clickability of search button
			complete: function(xhr, status) {
				$("#searchButton").toggleClass("btn-primary");
				$("#searchButton").val("Search");
				$("#searchButton").attr("disabled", false);
			},
			//Displays the error status if failed
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error: " + jqXHR.status + " - " + errorThrown);
			}
		});
	});
});