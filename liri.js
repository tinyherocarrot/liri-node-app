var keys = require("./keys.js");

// functions
//=============================================
var getTweets = function() {
	// initialize Twitter pkg
	//+++++++++++++++++++++++++++++++++++++++++++
	var Twitter = require('twitter');
	var twitter = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});


	var params = {screen_name: 'HeroCarrot'};
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	  	return console.log(error);
	  }
	  // console.log(JSON.parse(tweets))
	  for (var tweet in tweets) {
	  	console.log(tweets[tweet].created_at, tweets[tweet].text);
	  	
	  }
	});
}

var getSpotify = function(arg="The Sign") {

	// initialize Spotify pkg
	//+++++++++++++++++++++++++++++++++++++++++++++
	var Spotify = require('node-spotify-api');
	var spotify = new Spotify({
	  id: keys.spotifyKeys.id,
	  secret: keys.spotifyKeys.secret
	});

	var argInput = process.argv
	var songName = "";
	
	for (var i=3; i<argInput.length; i++) {
		songName += " " + argInput[i]
	}

	// If no song is provided then your program will default to "The Sign" by Ace of Base
	if (songName === "") {
		songName = arg;
	}
	console.log("You searched for: " + songName);

	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	// console.log(data.tracks)
	console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0]["name"]));
	console.log("Song: " + JSON.stringify(data.tracks.items[0].name));
	console.log("Preview this Song: " + JSON.stringify(data.tracks.items[0].preview_url));
	console.log("Album: " + JSON.stringify(data.tracks.items[0].album["name"]));


	});
}

var getMovie = function() {

	// initialize request
	//++++++++++++++++++++++++++++++++++++++++++++
	var request = require("request")

	var argInput = process.argv
	var movieName = "";
	
	for (var i=3; i<argInput.length; i++) {
		movieName += " " + argInput[i]
	}

	// If no song is provided then your program will default to "Mr. Nobody"
	if (movieName === "") {
		movieName = "Mr. Nobody";
	}
	console.log("You searched for: " + movieName);

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function (error, response, body) { 
		if (error) { return console.log('error: ', error)};
		// console.log('statusCode: ', response && response.statusCode);
		if (response && (response.statusCode === 200)){
			//title
			console.log("Title: " + JSON.parse(body).Title);
			//release
			console.log("Released: " + JSON.parse(body).Released);
			//imdb ratin
			console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
			//rT rating
			console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
			//country produced
			console.log("Country Produced: " + JSON.parse(body).Country);
			//Language of the movie
			console.log("Languages: " + JSON.parse(body).Language);
			//short plot
			console.log("Plot: " + JSON.parse(body).Plot);
			//actors
			console.log("Actors: " + JSON.parse(body).Actors);	
		}
	});
}

var doIt = function() {
	var fs = require("fs");
	var song = "";
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(",");
		// console.log(dataArr[1]);
		getSpotify(dataArr[1]);
	})
}

var runCmd = function (cmd) {
	switch (cmd) {
		// show your last 20 tweets and when they were created at in your terminal/bash window
		case "my-tweets":
			getTweets();
			break;

		// show twitter stream
		case "hack-twitter":
			// initialize Twitter pkg
			//+++++++++++++++++++++++++++++++++++++++++++
			var Twitter = require('twitter');
			var twitter = new Twitter({
			  consumer_key: keys.twitterKeys.consumer_key,
			  consumer_secret: keys.twitterKeys.consumer_secret,
			  access_token_key: keys.twitterKeys.access_token_key,
			  access_token_secret: keys.twitterKeys.access_token_secret
			});

			twitter.stream('statuses/filter', {track: 'twitter'},  function(stream) {
	  			stream.on('data', function(tweet) {
	    			console.log(tweet.text);
	  			});

				stream.on('error', function(error) {
				    console.log(error);
				});
			});
			break;

		// show the following information about the song in your terminal/bash window: Artist(s), The song name, A preview link of the song from Spotify, The album that the song is from
		case "spotify-this-song": 
			getSpotify();
			break;

		case "movie-this":
			getMovie();
			break;

		case "do-what-it-says":
			doIt();
			break;
	}
}

// main logic
//++++++++++++++++++++++++++++++++++++++
var cmd = process.argv[2];
runCmd(cmd);