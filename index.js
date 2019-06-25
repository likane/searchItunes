var TEST_ENV = true;
var inputValue = "";
var searched = false;
var savedCount = 0;
var hasFav = false;
var valueArr = [null];
var savedItemNameArr = [null];
var savedArtistNameArr = [null];
var favoritesList;
// var track;
// var trackname;
// var artistname;
// var artwork;
// var genrelink;
// var urllink;

// Initialize Favorites section depending on saved data in browser
showFavorites();
displayResults();

// if there are no saved items do not show Favorites section
function showFavorites() {
  if (hasFav === false) {
    document.getElementById("favoritesBody").style.display = "none";
    console.log("showFav: SavedCount= " + savedCount);
  } else {
    document.getElementById("favoritesBody").style.display = "block";
  }
}

/*
  1) check validity of data
  2) if there is a null space value in a string then add a '+' 
  3) call fetchData() to return API values
*/
function checkData() {
  //set search value to a var
  var searchParamater = document.getElementById("searchValue").value;
  console.log("searchParameter is: " + searchParamater);

  // check if searchValue has a space in it
  try {
    if (searchParamater === " ") {
      if (TEST_ENV) {
        console.log("please type something into the search bar");
      }
    } else if (searchParamater != null && searchParamater.indexOf(" ") > -1) {
      // Search value includes white space
      // find white space / /g and replace with '+'
      inputValue = searchParamater.replace(/ /g, "+");

      searched = true;
      fetchData(inputValue);

      if (TEST_ENV) {
        console.log("inputValue is: " + inputValue);
      }
    } else {
      inputValue = searchParamater;
      searched = true;
      fetchData(inputValue);

      if (TEST_ENV) {
        console.log("inputValue is: " + inputValue);
      }
    }
  } catch (err) {
    console.log("checkData(): " + err);
  }
}

/*
  1) input param: inputValue / corrected input data
  2) GET api data from itunes search link
  3) set api JSON response to result array
  4) set searched = true
  4) Call displayResults()
*/
function fetchData(inputValue) {
  let URL = `https://itunes.apple.com/search?term=${inputValue}&limit=10`;
  searched = true;

  if (TEST_ENV) {
    console.log("inputValue is: " + inputValue);
    console.log(URL);
  }

  fetch(URL)
    .then(function(response) {
      return response.json();
    })
    // .then(function(myJson) {
    //   console.log(JSON.stringify(myJson));
    // })
    .then(function(data) {
      let responseTypes = data.results;

      return responseTypes.map(function(responseTypes) {
        var track = responseTypes.trackId;
        var trackname = responseTypes.trackName;
        var artistname = responseTypes.artistName;
        var artwork = responseTypes.artworkUrl100;
        var genrelink = responseTypes.primaryGenreName;
        var urllink = responseTypes.previewUrl;
        valueArr = [track, trackname, artistname, artwork, genrelink, urllink];
        searched = true;
        displayResults(valueArr);

        if (TES_ENV) {
          // let track = console.log("trackId: " + responseTypes.trackId);
          // let trackname = console.log("trackName: " + responseTypes.trackName);
          // let artistname = console.log("ArtistName: " + responseTypes.artistName);
          // let artwork = console.log("artworkUrl: " + responseTypes.artworkUrl30);
          // let genre = console.log("genre: " + responseTypes.primaryGenreName);
          // let url = console.log("URL: " + responseTypes.previewUrl);
          //console.log(valueArr);
        }
      });
    })
    .catch(function(err) {
      console.log("response failed", err);
      searched = true;
    });
}

// function callResultsAndFavorites() {
//   displayResults(valueArr);
//   favoritesResults();
// }

/*
    Type: functions
    Purpose: 1) check for successful response
            2) if no data then show body "please search"
            3) if data then iterate through each valueArr and display cards
*/

/*
  1) input param: valueArr / JSON response values from itunes API
  2) create dynamic HTML elements for each valueArr instance
  3) set api JSON response to result array
  4) set searched = true
  4) Call displayResults()
*/
function displayResults(valueArr) {
  if (TEST_ENV) {
    console.log("displayresults hit");
  }

  var resultsList = document.getElementById("resultsSection");

  if (searched === false) {
    console.log("searched = false");

    //resultsBody.classList.add("")
    //resultsBody.innerHTML = "<h3>";
    // var resultsPromptText = document.createElement("h3");
    // resultsPromptText.classList.add("searchPrompt");
    // resultsPromptText.innerHTML = "Please search for an artist";
    // resultsList.appendChild(resultsPromptText);
  } else if (searched === true && valueArr != null) {
    if (TEST_ENV) {
      console.log("searched = true and arr not null");
    }

    //h3.removeChile(h3.childNodes[0]);
    //var resultsPromptText = document.getElementsByClassName("searchPrompt");
    //resultsPromptText.remove();
    //document.getElementByClassName("searchPrompt").style.display = "none";
    //var resultsList = document.getElementById("resultsSection");

    var uList = document.createElement("ul");
    resultsList.appendChild(uList);

    var listItem = document.createElement("li");
    listItem.classList.add("rounded");
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    var newCardBody = document.createElement("div");
    newCardBody.classList.add("card-body");
    var newH5 = document.createElement("h5");
    newH5.classList.add("card-title");
    newH5.innerHTML = valueArr[1];
    var artistP = document.createElement("p");
    artistP.classList.add("card-text");
    artistP.innerHTML = valueArr[2];
    var trackIDP = document.createElement("p");
    trackIDP.classList.add("card-text");
    trackIDP.innerHTML = valueArr[0];
    var trackImageImg = document.createElement("img");
    trackImageImg.classList.add("card-img-top");
    trackImageImg.src = valueArr[3];
    var genreP = document.createElement("p");
    genreP.classList.add("card-text");
    genreP.innerHTML = valueArr[4];
    var trackViewP = document.createElement("p");
    trackViewP.classList.add("card-text");
    trackViewP.innerHTML = valueArr[5];
    var favoriteButton = document.createElement("button");
    favoriteButton.classList.add("btn");
    //favoriteButton.addEventListener("click", storeFavorites(), false);
    favoriteButton.innerHTML = "favorite";

    newCardBody.innerHTML +=
      newH5.outerHTML +
      artistP.outerHTML +
      genreP.outerHTML +
      trackViewP.outerHTML +
      favoriteButton.outerHTML;

    newCard.appendChild(trackImageImg);
    newCard.appendChild(newCardBody);
    listItem.appendChild(newCard);
    uList.appendChild(listItem);
    resultsList.appendChild(uList);
  } else {
    var displayAlert = document.createElement("h3");
    displayAlert.innerHTML = "Your search failed";
  }
}

function storeFavorites() {
  savedCount = savedCount + 1;
  console.log("storeFavorites: savedCount= " + savedCount);

  try {
    var savedItemName = trackname;
    var savedArtistName = artistname;

    savedItemNameArr.push(savedItemName);
    savedArtistNameArr.push(savedArtistName);
    localStorage.setItem(savedItemNameArr, savedArtistNameArr, savedCount);
    favoritesResults();
  } catch (err) {
    console.log(err);
  }
}

function favoritesResults() {
  favoritesList = document.getElementById("favoritesBody");
  if (savedCount === 0) {
    favoritesList.style.display = "none";
  } else {
    favoritesList.style.display = "block";
    console.log(savedItemNameArr);
    console.log(savedArtistNameArr);
  }
}
