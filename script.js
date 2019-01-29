$(document).ready(function () {
    // jQuery methods go here...

    $("#boxer").on("focus", function () {
        $("#boxer").val("");

        $('#go').click(function () {

            var term = $('#boxer').val();
            console.log(term);

            var wikiURL = "https://en.wikipedia.org/w/api.php";
            wikiURL += '?' + $.param({
                'action': 'opensearch',
                'search': term,
                'prop': 'revisions',
                'rvprop': 'content',
                'format': 'json',
                'limit': 10
            });

            $.ajax({
                url: wikiURL,
                dataType: 'jsonp',
                success: function (data) {
                    console.log(data);
                    var requestHTML = "<p>" + data[0] + "<p>";

                    var dataHTML = data[1];
                    var moreHTML = data[2];
                    var goHTML = data[3];
                    var dLen = dataHTML.length;
                    var text = "<ul>";
                    for (i = 0; i < dLen; i++) {
                        var listHTML = dataHTML[i];
                        var linkHTML = goHTML[i];
                        var paraHTML = "<span>" + moreHTML[i] + "</span>";
                        text += "<li>" + '<a href=' + linkHTML + '>' + listHTML + " " + paraHTML + '</a>' + "</li>";
                    }
                    text += "</ul>";

                    var list = $('#outBox').val();
                    list !== ('') ? list : $('#outBox').empty();

                    $('text').addClass('outbox');
                    $("#outBox").append(text);

                    return false;
                }
            });
        });
    });
});