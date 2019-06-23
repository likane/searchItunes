var inputValue = "";
var searched = false;
var hasFavorites = false;
var track;
var trackname;
var artistname;
var artwork;
var genrelink;
var urllink;
var valueArr = [null];

function checkData() {
  //set search value to a var
  var searchParamater = document.getElementById("searchValue").value;
  console.log("searchParameter is: " + searchParamater);

  // check if searchValue has a space in it
  try {
    if (searchParamater === " ") {
      console.log("please type something into the search bar");
    } else if (searchParamater != null && searchParamater.indexOf(" ") > -1) {
      // Search value includes white space
      // find white space / /g and replace with '+'
      inputValue = searchParamater.replace(/ /g, "+");
      console.log("inputValue is: " + inputValue);
      searched = true;
      fetchData(inputValue);
    } else {
      inputValue = searchParamater;
      console.log("inputValue is: " + inputValue);
      searched = true;
      fetchData(inputValue);
    }
  } catch (err) {
    console.log("checkData(): " + err);
  }
}

function fetchData(inputValue) {
  console.log("inputValue is: " + inputValue);
  let URL = `https://itunes.apple.com/search?term=${inputValue}&limit=10`;
  //https://cors-anywhere.herokuapp.com/
  console.log(URL);
  searched = true;

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
        // let track = console.log("trackId: " + responseTypes.trackId);
        // let trackname = console.log("trackName: " + responseTypes.trackName);
        // let artistname = console.log("ArtistName: " + responseTypes.artistName);
        // let artwork = console.log("artworkUrl: " + responseTypes.artworkUrl30);
        // let genre = console.log("genre: " + responseTypes.primaryGenreName);
        // let url = console.log("URL: " + responseTypes.previewUrl);
        track = responseTypes.trackId;
        trackname = responseTypes.trackName;
        artistname = responseTypes.artistName;
        artwork = responseTypes.artworkUrl30;
        genrelink = responseTypes.primaryGenreName;
        urllink = responseTypes.previewUrl;
        valueArr = [track, trackname, artistname, artwork, genrelink, urllink];
        searched = true;
        //var valueArr = [""];
        console.log(valueArr);
        displayResults(valueArr);
        //return valueArr;
      });
    })
    .catch(function(err) {
      console.log("fetchData(): response failed", err);
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
function displayResults(valueArr) {
  console.log("displayresults hit");
  var resultsList = document.getElementById("resultsSection");
  if (searched === false) {
    console.log("searched = false");

    //resultsBody.classList.add("")
    //resultsBody.innerHTML = "<h3>";
    var h3 = document.createElement("h3");
    h3.innerHTML = "Please search for an artist";
    resultsList.appendChild(h3);
  } else if (searched === true && valueArr != null) {
    console.log("searched = true and arr not null");
    //var resultsList = document.getElementById("resultsSection");
    var uList = document.createElement("ul");
    // var listItem = document.createElement("li");
    // var title = document.createElement("h4");
    // title.innerHTML = "test";
    // listItem.appendChild(title);
    // uList.appendChild(listItem);
    resultsList.appendChild(uList);
    // iterate through each valueArr
    // for (var i = 0; i < valueArr.length; i++) {
    var listItem = document.createElement("li");
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
    var trackImageImg = document.createElement("p");
    trackImageImg.classList.add("card-text");
    trackImageImg.innerHTML = valueArr[3];
    var genreP = document.createElement("p");
    genreP.classList.add("card-text");
    genreP.innerHTML = valueArr[4];
    var trackViewP = document.createElement("p");
    trackViewP.classList.add("card-text");
    trackViewP.innerHTML = valueArr[5];

    newCardBody.appendChild(newH5);
    newCard.appendChild(newCardBody);
    listItem.appendChild(newCard);
    uList.appendChild(listItem);
    resultsList.appendChild(uList);
    // }
    // }
  } else {
    var resultsList = document.getElementById("resultsSection");
    //resultsBody.classList.add("")
    //resultsBody.innerHTML = "<h3>";
    var h3 = document.createElement("h3");
    h3.innerHTML = "Your search failed";
  }
}

function favoritesResults() {
  if (hasFavorites === false) {
    var favoritesList = document.getElementById("favoritesSection");
    //resultsBody.classList.add("")
    //resultsBody.innerHTML = "<h3>";
    var h3 = document.createElement("h3");
    h3.innerHTML = "Please search for an artist";
    favoritesList.appendChild(h3);
  }
}
