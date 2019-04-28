require('dotenv').config()

//VARUABLES
//variables required for commands to run
var keys = require('./keys.js');
var axios = require('axios')
var Spotify = require('node-spotify-api');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
//moment variable
var moment = require('moment');
//variables to pass through the arguments
var input = process.argv[2];
var output = process.argv.slice(3).join(' ');
// console.log(output);

//FUNCTIONS - switch/case
switch(input) {
  // concert-this
  case "concert-this":
    concertThis();
    break;
  // spotify-this-song
  case "spotify-this-song":
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!output) {
      output = "the sign ace of base"
    }
    spotifyThisSong();
    break;
  // movie-this
  case "movie-this":
  //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  if (!output) {
    output = "Mr. Nobody"
  }
    movieThis();
    break;
  // do-what-it-says
  case "do-what-it-says":
    doWhatItSays();
    break;
};

//What Each Command Should Do:

// 1. node liri.js concert-this <artist/band name here>
function concertThis() {
  var queryUrl = "https://rest.bandsintown.com/artists/" + output + "/events?app_id=codingbootcamp"
  //pull info using axios.get
  axios.get(queryUrl).then(function(response) {

    var bandInfo = response.data[0].venue;
    // Date of the Event (use moment to format this as 'MM/DD/YYYY')
    var momentConcert = moment(bandInfo.datetime).format('MM/DD/YYY')
    // for an artist and render the following information about each event to the terminal: using console.log()
    console.log(
      "\nName of the venue: " + bandInfo.name +
      "\n\nVenue Location: " + bandInfo.city + "," + bandInfo.country +
      "\n\nDate of the Event: " + momentConcert +
      "\n\n==========================================================\n");
  });
};

// 2. node liri.js spotify-this-song '<song name here>'
function spotifyThisSong() {
  spotify.search({
    type: 'track',
    query: output,
    limit: 1
  }, function(err, response) {
      var spotifyData = response.tracks.items
      //use callback function to display an error if cannot find song
      if (err) {
        return console.log('An error has occurred: ' + err);
      } else for (var i = 0; i < spotifyData.length; i++) {
          var songInfo = spotifyData[i];
          console.log(
            "\nArtist(s): " + songInfo.artists[0].name +
            "\n\nSong Name: " + songInfo.name +
            "\n\nSpotify Preview Link: " + songInfo.external_urls.spotify +
            "\n\nAlbum Name: " + songInfo.album.name +
            "\n\n==========================================================\n");
        };
      });
};

// 3. node liri.js movie-this '<movie name here>'
function movieThis() {
  // Use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key, trilogy.
  var queryUrl = "http://www.omdbapi.com/?t=" + output + "&y=&plot=short&apikey=trilogy";
  // console.log(queryUrl);
  axios.get(queryUrl).then(function(response){
    var movieData = response.data;
        console.log(
          "\nTitle of the movie: " + movieData.Title +
          "\n\nYear: " + movieData.Year +
          "\n\nIMBD Rating: " + movieData.imdbRating +
          "\n\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
          "\n\nCountry: " + movieData.Country +
          "\n\nLanguage: " + movieData.Language +
          "\n\nPlot: " + movieData.Plot +
          "\n\nActors: " + movieData.Actors +
          "\n\n==========================================================\n");
    });
};

// 4. node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    var randomTxt = data.split(",");
    console.log(randomTxt);
  });
}
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
