$(document).ready(function () {

    var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
    //    STEP 1:  Get input from the user
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query);
        $('.js-search-form').trigger("reset");
    });

    //    STEP 2:  Using input from user, make API call to get the JSON response
    function getDataFromApi(userSearchTerm) {
        $.getJSON(YOUTUBE_URL, {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyBNb-0Xbxn-soL4G0QSs-jW0GhL_qBpsoI",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                if (receivedApiData.pageInfo.totalResults === 0) {
                    resultElement += '<p>No videos found</p>';
                } else {
                    displayYOUTUBESearchData(receivedApiData.items);
                }
            });
    }

    //    STEP 3:  Using the JSON response (videos), populate the HTML with the variable inside the JSON
    function displayYOUTUBESearchData(data) {
        var buildHTML = "";
        $.each(data, function (dataKey, dataValue) {
            buildHTML += "<li>";
            buildHTML += "<p>" + dataValue.snippet.title + "</p>";
            buildHTML += "<a href='https://www.youtube.com/watch?v=" + dataValue.id.videoId + "' target='_blank'>";
            buildHTML += "<img src='" + dataValue.snippet.thumbnails.high.url + "'/>";
            buildHTML += "</a>";
            buildHTML += "</li>";
        });

        $(".js-search-results ul").html(buildHTML);
    }
});
