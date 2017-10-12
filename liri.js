// initialize Twitter pkg
//+++++++++++++++++++++++++++++++++++++++++++
var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
 
var twitter = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});
 


// initialize Spotify pkg
//+++++++++++++++++++++++++++++++++++++++++++++
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "c105027daf8944c1ad96916649e2565c",
  secret: "77127f7d427b43848e7b4b251e79a8c3"
});

// initialize request
//++++++++++++++++++++++++++++++++++++++++++++
var request = require("request")

// main logic here
//=============================================
var cmd = process.argv[2];

switch (cmd) {
	// show your last 20 tweets and when they were created at in your terminal/bash window
	case "my-tweets":
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

	// show twitter stream
	case "twitter-stream":
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
	// If no song is provided then your program will default to "The Sign" by Ace of Base
	case "spotify-this-song": 
		var songName = process.argv[3].trim();
		// console.log(songName);
		spotify.search({ type: 'track', query: songName }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		console.log(data.tracks); 
		});
		break;

	case "movie-this":
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