
// let us do some global  , would be better to use sqlLight, redis, graphQL, mangoDb(NYC)
// ad hoc to accomplish my deeds fomally ...

var characters = [
  "Solaris",
  "Stalker",
  "Memento",
  "Riddick",
  "Pi(1998)"
];


//  OOP   Abstract Fabric Patterns  do we have to Apply - Si!  de acuerdo
var app = {
// Self.descriptive! want to finish asap. web assembly!
  new: function() {
    $("#gifControls").hide();
    this.appendButtons();
    this.bindCButtonsClick();
    this.bindCFormSubmit();
    this.bindGifClick();
    this.bindGlobalGifActions();
  },

  appendButtons: function() {
    characters.forEach(function(character) {
      app.appendCButton(character);
    });
  },

  appendCButton: function(character) {
    var button = $("<button>")
      .attr("data-character", character)
      .addClass("btn btn-outline-success m-1 character")
      .text(character);

    $("#characters").append(button);
  },

  bindCButtonsClick: function() {
    $(document).on("click", ".character", function() {
      app.settings.currentCharacter = $(this).attr("data-character");
      app.settings.gifSearchCurrentOffset = 0;

      $(".gifCard").remove();

      app.searchGifs();
    });
  },

  bindCFormSubmit: function() {
    $("#characterForm").submit(function(e) {
      e.preventDefault();

      var newCharacter = $("#characterName")
        .val().trim();

      if (newCharacter !== "") {
        app.appendCButton(newCharacter);
      } else {
        alert("Error: No name provided");
      }

      $("#characterName").val("");
    });
  },


  settings: {
    apiKey: "pM6UtU7TGRrtgGyXXULyNyANTB7kjb4C",
    currentCharacter: "",
    gifSearchBaseUrl: "https://api.giphy.com/v1/gifs/search",
    gifSearchCurrentOffset: 0,
    gifSearchLimit: 20
  },


  // as we were told   "Dynamic typing "  $(document).on("click", CLASS, function() !!!!
  bindGifClick: function() {
    $(document).on("click", ".gif", function() {
      $(this).toggleClass("playing");
      app.updateGifImage($(this));
    });
  },

  updateGifImage: function(gif) {
    if (gif.hasClass("playing")) {
      gif.attr("src", gif.attr("data-original"));
    } else {
      gif.attr("src", gif.attr("data-still"));
    }
  },

  bindGlobalGifActions: function(gif) {
    $("#more").click(function() {
      app.searchGifs();
    });

    $("#play-all").click(function() {
      $(".gif").each(function() {
        $(this).addClass("playing");
        app.updateGifImage($(this));
      });
    });

    $("#stop-all").click(function() {
      $(".gif").each(function() {
        $(this).removeClass("playing");
        app.updateGifImage($(this));
      });
    });
  },

  searchGifs: function() {
    $("#gifControls").hide();
    $.ajax({
      method: "GET",
      url: this.gifSearchUrl()
    }).then(function(response) {
      response.data.forEach(function(data) {
        app.appendGif(data);
      });

      app.settings.gifSearchCurrentOffset += app.settings.gifSearchLimit;
      $("#gifControls").show();
    });
  },

  gifSearchUrl: function() {
    return (
      this.settings.gifSearchBaseUrl +
      "?api_key=" +
      this.settings.apiKey +
      "&q=" +
      this.settings.currentCharacter +
      "&limit=" +
      this.settings.gifSearchLimit +
      "&offset=" +
      this.settings.gifSearchCurrentOffset
    );
  },

  appendGif: function(data) {
    var stillImage = data.images.original_still.url;
    var originalImage = data.images.original.url;

    var gifCard = $("<div>").addClass("card gifCard");

    var img = $("<img>")
      .addClass("gif card-img-top")
      .attr("data-original", originalImage)
      .attr("data-still", stillImage)
      .attr("src", stillImage);

    gifCard.append(img);

    var cardFooter = $("<div>").addClass("card-footer");

    var rating = $("<p>")
      .addClass("text-center mb-0")
      .append(
        $("<span>")
          .addClass("badge badge-light")
          .text("Rating: " + data.rating)
      );

    cardFooter.append(rating);
    gifCard.append(cardFooter);

    $("#gifs").append(gifCard);
  }
};

// create an object of class __init()
app.new();
