var mongo = require('mongodb').MongoClient;

/**
 * This is used to connect to mongodb.
 **/
var dbinfo = require ('./config.json');
var url = 'mongodb://' + dbinfo.user + ':' + dbinfo.password + '@' + dbinfo.location + 
			':' + dbinfo.port +'/' + dbinfo.name;

/**
 * Author: Jason Klamert
 * Date: 3/15/2017
 * Description: Gets the framework catalog of a specific framework
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
 * Author: Jason Klamert
 * Date: 3/15/2017
 * Description: Gets all of the frameworks.
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
 * Author: Jason Klamert
 * Date: 3/15/2017
 * Description: Gets all of the controls for a framework.
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
 * Author: Jason Klamert
 * Date: 3/15/2017
 * Description: Find control by both framework name and control name.
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
 * Author: Jason Klamert
 * Date: 3/15/2017
 * Description: Function that finds all frameworks with a given business type.
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