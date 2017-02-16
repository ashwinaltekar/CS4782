var express = require('express');
var app = express();
var port = 80;

//allow access to the public directory 
app.use (express.static ('public'));

app.listen (port, function (){
	console.log ("Listening to port: " + port);
});