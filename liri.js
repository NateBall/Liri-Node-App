// Required ================================
require("dotenv").config();
const fs = require('fs');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");


var commandLine = process.argv[2];

// Moment====================================
var moment = require('moment');

// Spotify===================================
var spotify = new Spotify(keys.spotify);

function spotifyThis() {
  spotify.search({ type: 'track', query: mediaName, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var nameBand = data.tracks.items[0].album.artists[0].name;
    console.log(data.tracks.items[0].name);
    console.log((nameBand));
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url);
  });
};


// OMDB =====================================
var mediaName = process.argv[3];

function movieThis() {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + mediaName)
  .then(function (response) {
      var dataFind = response.data;
        console.log("\n", dataFind.Title, "\n", dataFind.Year, "\n", dataFind.Country, "\n", dataFind.Actors, "\n", dataFind.Plot, "\n", dataFind.Language, "\n");
        for (i = 0; i < dataFind.Ratings.length; i++) {
          var source = dataFind.Ratings[i].Source;
          var value = dataFind.Ratings[i].Value;
          console.log(source + ":" + value, "\n");
        }
      })
  .catch(function (error) {
    console.log(error);
  });
};

// Concert This====================

function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=codingbootcamp")
  .then(function (response) {
    var dataFind = response.data[0];
      console.log("\n", dataFind.venue.name, "\n", dataFind.venue.city, "\n", dataFind.venue.region, "\n", moment(dataFind.datetime).format("MMM Do YY"), "\n");
    })
.catch(function (error) {
  console.log(error);
});
};



// Conditionals==============================

if (commandLine === "movie-this") {
    movieThis();
}

else if (commandLine === "concert-this") {
  concertThis();
}

else if (commandLine === "spotify-this") {
  spotifyThis();
}








