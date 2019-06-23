var inputValue = "";

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
      fetchData(inputValue);
    } else {
      inputValue = searchParamater;
      console.log("inputValue is: " + inputValue);
      fetchData(inputValue);
    }
  } catch (err) {
    console.log(err);
  }
}

function fetchData(inputValue) {
  console.log("inputValue is: " + inputValue);
  let URL = `https://itunes.apple.com/search?term=${inputValue}&limit=1`;
  //https://cors-anywhere.herokuapp.com/
  console.log(URL);

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
        let track = responseTypes.trackId;
        let trackname = responseTypes.trackName;
        let artistname = responseTypes.artistName;
        let artwork = responseTypes.artworkUrl30;
        let genrelink = responseTypes.primaryGenreName;
        let urllink = responseTypes.previewUrl;
        var valueArr = [
          track,
          trackname,
          artistname,
          artwork,
          genrelink,
          urllink
        ];
        //var valueArr = [""];
        console.log(valueArr);
        return valueArr;
      });
    })
    .catch(function(err) {
      console.log("response failed", err);
    });
}
