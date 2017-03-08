/*
*This module is used to connect and peform operations on a mongodb
*/

var MongoClient = require ('mongodb').MongoClient;

//this is the config file that is used to configure the database
var dbinfo = require ('./config.json');
var url = 'mongodb://' + dbinfo.user + ':' + dbinfo.password + '@' + dbinfo.location + ':' + dbinfo.port +'/' + dbinfo.name;


//searches for documents based off of a pattern
var search = function (collection, pattern, callback)
{
	//set up connection with db
	MongoClient.connect (url, function (err, db)
	{ if (err)throw err;
	
			//query collection by pattern 
			db.collection(collection).find (pattern).toArray (function (err, result)
			{
				if(err) throw err;
				
				callback (result);
			});
		
		db.close ();
	});
};

//export query function
module.exports.search = search;