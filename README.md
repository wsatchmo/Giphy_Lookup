# Giphy_Lookup

## Responsive Gif lookup using the GIPHY API

A browser app for looking up gifs based on given topics utilizing the GIPHY API; fill in a search parameter, add it to the given search buttons, and click the new button to search. Hit the *Next Gifs In Topic* button to generate the next 10 gifs in the current topic.

+++ FEATURES +++
###### - Dynamically generated gifs and buttons
###### - Fully responsive layout
###### - Button to visit GIPHY url
###### - Button to copy embed link to clipboard
###### - Hover over still image to play Gif

### NOTES ###
If you are having trouble styling the dynamically generated content, it is probably because all of the styles are created inline with jQuery, like this -
```js
   var newDiv = $("<div class='card' style='float: left; margin: 15px 5px 15px 5px;'>");
```
You may have to remove these if you want to create your own css styling. 

Be careful with the javascript function called when clicking the button with a class of **.gif-button**; it is responsible for both pagination and generating the gif cards dynamically using **fetchGifs()**:

```js
$(document).on("click", ".gif-button", function() {
            var dataName = $(this).attr("data-name");
            currentTopic = dataName; 
            page = 0; //for Pagination
            fetchGifs(dataName); //creates Gif Cards
        });
```

###### Have fun coding!