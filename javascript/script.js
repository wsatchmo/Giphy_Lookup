        var startButtons = ["Black Hole", "Space", "Final Fantasy", "Horizon Zero Dawn", "Miyazaki", "Altered Carbon", "3D", "Cats", "Ancient Greece", "Lord of the Rings"];
        var page = 0; //FOR PAGINATION
        var currentTopic = "";
        for (i = 0; i < startButtons.length; i++){
            $("#buttons-appear-here").append("<button class='btn btn-info gif-button' style='margin: 10px;' data-name='" + startButtons[i] + "'>" + startButtons[i] + "</button>");
        }

        // * Adding buttons dynamically to the list of buttons based on what a user fills into a form
        $("#add-button").on("click", function(event){
            event.preventDefault();
            var inputGif = $("#new-button").val().trim();
            console.log(inputGif);
            $("#buttons-appear-here").append("<button class='btn btn-info gif-button' style='margin: 10px;' data-name='" + inputGif + "'>" + inputGif + "</button>");
        });
            
        $(document).on("click", ".gif-button", function() {
            var dataName = $(this).attr("data-name");
            currentTopic = dataName;
            page = 0;
            fetchGifs(dataName);
        });

        function fetchGifs(dataName){
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataName + "&api_key=R8mbncGCeeAsgjOgcREdBP77Ar5lc6rh&limit=10&offset=" + (page); //PAGINATOR
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // Make a div with jQuery and store it in a variable named newDiv.
                    var newDiv = $("<div class='card' style='float: left; margin: 15px 5px 15px 5px;'>");
                    // Make a paragraph tag with jQuery and store it in a variable named p.
                    var p = $("<p class='card-text text-center'>");
                    // Set the inner text of the paragraph to the rating of the image in results[i].
                    p.text("Rating: " + results[i].rating);
                    // Make an image tag with jQuery and store it in a variable named newImage.
                    var newImage = $("<img class='card-img-top' data-still='" + results[i].images["480w_still"].url + "' data-animate='"+ results[i].images.fixed_height.url +"' data-state='still'>");
                    var cardBody = $("<div class='card-body' style='display: inline-flex; justify-content: center;'>")
                    var siteButton = $("<button class='btn btn-primary button-url' value='" + results[i].url + "' style='margin-left: 2%;; margin-right: 2%; margin-bottom:5px; margin-top:5px'>See on GIPHY</button>");
                    var embedButton = $("<button class='btn btn-secondary button-embed' value='" + results[i].embed_url + "' style='margin-bottom:5px; margin-top:5px'>Copy Embed Link</button>");
                    // Set the image's src to results[i]'s fixed_height.url.
                    newImage.attr("src", results[i].images["480w_still"].url);
                    newDiv.append(p);
                    newDiv.append(newImage);
                    newDiv.append(cardBody);
                    cardBody.append(siteButton);
                    cardBody.append(embedButton);
                    // Prepend the div to the element with an id of gifs-appear-here.
                    $("#gifs-appear-here").prepend(newDiv);
                }
            });
        }

        //PAGINATION==============================================
        $(document).on("click", '#page-button', function(event) {
            event.preventDefault();
            page++;
            fetchGifs(currentTopic);
        });

        //function to visit the gifs site on GIPHY on click
        $(document).on("click", '.button-url', function() {
            var selectedVal = $(this).val();
            console.log(selectedVal);
            window.location = selectedVal;
        });

        //function to copy gif embed link
        $(document).on("click", '.button-embed', function() {
            navigator.clipboard.writeText($(this).val());
            console.log($(this).val());
            $(this).text("Copied to Clipboard!")
        });

        //function to play gifs on hover
        $(document).on("mouseenter", ".card-img-top", function() {
            console.log("hovered");
            if ($(this).attr("data-state") === 'still'){
            $(this).attr("src", $(this).attr('data-animate'));
            $(this).attr("data-state", 'animate');
            }
        });
        //function to pause gifs after hovering
        $(document).on("mouseleave", ".card-img-top", function(){
            console.log("unhovered");
            if ($(this).attr("data-state") === 'animate'){
            $(this).attr("src", $(this).attr('data-still'));
            $(this).attr("data-state", 'still');
            }
        });