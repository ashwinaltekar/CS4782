var express = require('../node_modules/express');
var app = express();
var port = 80;

//allow access to the angular.js application
app.use (express.static ('../app'));

app.listen (port, function (){
	console.log ("Listening to port: " + port);
});