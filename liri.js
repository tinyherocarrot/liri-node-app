var keys = require("./keys.js");





// main logic here
//=============================================
var cmd = process.argv[2];

switch (cmd) {
	// show your last 20 tweets and when they were created at in your terminal/bash window
	case "my-tweets":
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
		break;

	// // show twitter stream
	// case "twitter-stream":
	// 	twitter.stream('statuses/filter', {track: 'twitter'},  function(stream) {
 //  			stream.on('data', function(tweet) {
 //    			console.log(tweet.text);
 //  			});

	// 		stream.on('error', function(error) {
	// 		    console.log(error);
	// 		});
	// 	});
	// 	break;


	// show the following information about the song in your terminal/bash window: Artist(s), The song name, A preview link of the song from Spotify, The album that the song is from
	case "spotify-this-song": 

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
			songName = "The Sign";
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
		break;

	case "movie-this":

		// initialize request
		//++++++++++++++++++++++++++++++++++++++++++++
		var request = require("request")

		var movieName = process.argv[3].trim();
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		request(queryUrl, function (error, response, body) { 
			console.log('error: ', error);
			console.log('statusCode: ', response && response.statusCode);
			console.log('body: ', body);
			if (response && (response.statusCode === 200)){
				console.log(JSON.parse(body).Released);
			}
		});

		break;


	case "do-what-it-says":


		break;

}