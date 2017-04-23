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

    console.log ("Getting set of frameworks from type " + type);

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

/**
 * Author: Jacob Taylor
 * Date: 3/15/2017
 * Description: Function that gets a reference document then finds all controls related to it
 **/
exports.findControlsByReference = function (req, res)
{
	var name = req.params.name;
	
	  console.log ("Getting controls by reference document " + name);
	  
	  //get the controls from  a list of given references
	  var getcontrolsfromreference = function (references)
	  {
		   //set up connection with db
			mongo.connect (url, function (err, db)
			{ if (err)throw err;
				
				if (references.references)
				{
					db.collection('frameworks').find ({"id": {$in: references.references}}).toArray (function (err, result)
					{
						console.log (result);
						res.send (result);
					});
				}
				else if (references.description)
				{
					db.collection('frameworks').find ({"$text": {"$search": references.description}}).toArray (function (err, result)
					{
						console.log (result);
						res.send (result);
					});
				}
        
			db.close ();
		});
	  }
	  
	  //get a reference document by name
	  var getreferencebyname = function (name, callback)
	  {
		   //set up connection with db
			mongo.connect (url, function (err, db)
			{ if (err)throw err;
				
				 //first get the reference document
				db.collection('references').find ({"name" : name}).toArray (function (err, result)
				{
					callback (result[0]);
				});
        
			db.close ();
		});
	  }
	  
	  //do the various calls
	  getreferencebyname (name, getcontrolsfromreference);
	
};

/**
 * Author: Jason Klamert
 * Date: 4/16/2017
 * Description: Function that finds all similar controls from the provided description.
 **/
exports.findSimilarControlsByDescription = function (req, res)
{
	var description = req.params.description;

    console.log ("Getting set of similar controls based on description: " + description);

    //set up connection with db
    mongo.connect (url, function (err, db)
    { if (err)throw err;
    
    //query frameworks collection for similar controls by using the search text feature of mongodb.
    db.collection('frameworks').find ({
	"type": "control",
	"$text" : {
		"$search": "" + description
	}
	}).toArray (function (err, result)
            {
                res.send (result);
            });
        
        db.close ();
    });
}

/**
 * Author: Jason Klamert
 * Date: 4/21/2017
 * Description: Function that finds all similar controls from tag.
 **/
exports.findControlsByTag = function (req, res)
{
	var tag = req.params.tag;

    console.log ("Getting set of controls based on tag: " + tag);

    mongo.connect (url, function (err, db)
    { if (err)throw err;
    
    db.collection('frameworks').find ({
	"type": "control",
	"tag" : "" + tag
	
	}).toArray (function (err, result)
            {
                res.send (result);
            });
        
        db.close ();
    });
}

/**
 * Author: Jason Klamert
 * Date: 4/21/2017
 * Description: Function that updates a control object to have the given tag passed to the api.
 **/
exports.addTagToControl = function (req, res)
{
	var tag = req.params.tag;
	var control = req.params.control;

    console.log ("Adding tag: \"" + tag + "\" to control: \"" + control + "\".");

	/**
	 * Update the tag on the control from the database.
	 **/
	var updateControlWithTag = function(foundTag)
	{
			mongo.connect (url, function (err, db)
			{ 
				if (err)throw err;
	    		
	    		foundTag.push(tag);

			    /**
				 * Query the frameworks collection to take existing tags and insert a new tag.
				 **/
				db.collection('frameworks').updateOne({
					"_id" : "" + control,
					"type": "control",
					"name" : "" + control
				},
				{
					$set: {"tag": foundTag}
				});

				res.send();
        
			db.close ();
		});
	  }
	  
	/**
	 * Get the control from the database.
	 **/
	var getControlByName = function (name, callback)
	{
		mongo.connect (url, function (err, db)
		{ 
			if (err)throw err;
			
			db.collection('frameworks').find({"_id" : "" + control, "name": "" + control, "type": "control"}).toArray(function (err, result)
			{	
				callback (result[0].tag);
			});
       
		db.close ();
		});
	  }
	  
	  getControlByName(control, updateControlWithTag);
}