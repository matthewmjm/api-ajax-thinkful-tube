$(document).ready(function () {


    var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
//    STEP 1:  Get input from the user
    function watchSubmit() {
        $('.js-search-form').submit(function (event) {
            event.preventDefault();
            var query = $(this).find('.js-query').val();
            getDataFromApi(query, displayYOUTUBESearchData);
        });
    }

    $(function () {
        watchSubmit();
    });

    function getDataFromApi(userSearchTerm, callback) {
        var query = {
            part: "snippet",
            key: "AIzaSyBNb-0Xbxn-soL4G0QSs-jW0GhL_qBpsoI",
            q: userSearchTerm,
            type: "video"
        }
        $.getJSON(YOUTUBE_URL, query, callback);
    }


    function displayYOUTUBESearchData(data) {
        var resultElement = '';
        if (data.pageInfo.totalResults !== 0) {
            data.Search.forEach(function (item) {
                resultElement += '<p>' + item.Title + '</p>';
            });
        } else {
            resultElement += '<p>No videos found</p>';
        }

        $('.js-search-results').html(resultElement);
    }




});
