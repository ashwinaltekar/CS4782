var mongo = require('mongodb').MongoClient;

//this is used to create the connection url to the database
var dbinfo = require ('./config.json');
var url = 'mongodb://' + dbinfo.user + ':' + dbinfo.password + '@' + dbinfo.location + 
			':' + dbinfo.port +'/' + dbinfo.name;

/**
 * Gets the framework catalog of a specific framework
 **/
exports.findFrameworkByName = function(req, res) {
    var name = req.params.name;
    console.log('Retrieving framework: ' + name);
    //set up connection with db
	mongo.connect (url, function (err, db)
	{ 
        if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"framework": "" + name, "type": "catalog"}).toArray (function (err, result)
			{
				
				res.send (result);
			});
		
		db.close ();
	});
};

/**
 *Gets all framework catalogs and returns them
 **/
exports.findAllFrameworks = function(req, res) {
	
    console.log("Retrieving all frameworks!");
	//set up connection with db
	mongo.connect (url, function (err, db)
	{ 
        if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"type": "catalog"}).toArray (function (err, result)
			{
				res.send (result);
			});
		
		db.close ();
	});
};

/**
 * Gets all controls by a particular framework id
 **/
exports.findAllFrameworkControls = function(req, res) {
    var name = req.params.name;
    console.log('Retrieving framework: ' + name + " and all framework controls!");
	
	//connect using mongo and the database url then close
	mongo.connect (url, function (err, db){ 
		if (err)throw err;
	
		//query collection by pattern 
		db.collection('frameworks').find ({"framework": ""  + name, "type": "control" }).toArray (function (err, result)
		{
				res.send (result);
		});
		
		//close the database connection after query
		db.close ();
	});
   
};

/**
 * Gets a control by a particular framework id and a name
 **/
exports.findFrameworkControlByFrameworkNameAndControlName = function(req, res) {
	var fname = req.params.fname;
	var name = req.params.name;

	console.log ("Getting control " + name + " from framework " + fname);

	//set up connection with db
	mongo.connect (url, function (err, db)
	{ if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"framework": "" + fname, "name": "" + name, "type": "control"}).toArray (function (err, result)
			{
				
				res.send (result);
			});
		
		db.close ();
	});
};

/**
 * Gets a set of one or more frameworks by business type.
 **/
exports.findFrameworkByBusinessType = function(req, res) {
    var type = req.params.type;

    console.log ("Getting set of frameworks from type" + type);

    //set up connection with db
    mongo.connect (url, function (err, db)
    { if (err)throw err;
    
            //query collection by pattern 
            db.collection('frameworks').find ({"busType": "" + type, "type": "catalog"}).toArray (function (err, result)
            {
                res.send (result);
            });
        
        db.close ();
    });
};