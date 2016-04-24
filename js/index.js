$(document).ready(function() {
	$("#searchButton").on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass("btn-primary");
		$(this).val("Loading");
		$('#searchResults').empty();
		$(this).attr("disabled", true);
		var wordsToSearch = $('#searchText').val();
		var cb = '&callback=?';
		console.log(wordsToSearch);
		var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
		$.ajax({
			url: api + wordsToSearch + cb,
			dataType: 'jsonp',
			type: 'GET',
			success: function(data) {
				var results = data.query.pages;
				console.log(results);
				$.each(data.query.pages,function(i, page) {
					var resultsDiv = "<div> <h4>" + page.title + "</h4> <li>" + page.extract + "</li></div>";
					$('#searchResults').append(resultsDiv);
				});
			},
			complete: function(xhr, status) {
				$("#searchButton").toggleClass("btn-primary");
				$("#searchButton").val("Search");
				$("#searchButton").attr("disabled", false);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error: " + jqXHR.status + " - " + errorThrown);
			}
		});
	});
});