var mongo = require('mongodb').MongoClient;

//this is used to create the connection url to the database
var dbinfo = require ('./config.json');
var url = 'mongodb://' + dbinfo.user + ':' + dbinfo.password + '@' + dbinfo.location + 
			':' + dbinfo.port +'/' + dbinfo.name;

/**
 * Gets the framework catalog of a specific framework
 **/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving framework: ' + id);
    //set up connection with db
	mongo.connect (url, function (err, db)
	{ if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"framework": "" + id, "type": "catalog"}).toArray (function (err, result)
			{
				
				res.send (result);
			});
		
		db.close ();
	});
};

/**
 *Gets all framework catalogs and returns them
 **/
exports.findAll = function(req, res) {
	
	//set up connection with db
	mongo.connect (url, function (err, db)
	{ if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"type": "catalog"}).toArray (function (err, result)
			{
				
				res.send (result);
			});
		
		db.close ();
	});
};

exports.addFramework = function(req, res) {
    var framework = req.body;
    console.log('Adding framework: ' + JSON.stringify(framework));
    db.collection('frameworks', function(err, collection) {
        collection.insert(framework, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred while adding.'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateFrameworkById = function(req, res) {
    var id = req.params.id;
    var framework = req.body;
    console.log('Updating framework: ' + id);
    console.log(JSON.stringify(framework));
    db.collection('frameworks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, framework, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating framework: ' + err);
                res.send({'error':'An error has occurred while updating'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(framework);
            }
        });
    });
}

exports.deleteFrameworkById = function(req, res) {
    var id = req.params.id;
    console.log('Deleting framework: ' + id);
    db.collection('frameworks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}



/**
 * Gets all controls by a particular framework id
 **/
exports.findAllFrameworkControls = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving framework: ' + id);
	
	//connect using mongo and the database url then close
	mongo.connect (url, function (err, db){ 
		if (err)throw err;
	
		//query collection by pattern 
		db.collection('frameworks').find ({"framework": ""  + id, "type": "control" }).toArray (function (err, result)
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
 
exports.findFrameworkControlByIdAndName = function(req, res) {
	var id = req.params.id;
	var name = req.params.name;
	console.log ("Getting control " + name + " from framework " + id);
	//set up connection with db
	mongo.connect (url, function (err, db)
	{ if (err)throw err;
	
			//query collection by pattern 
			db.collection('frameworks').find ({"framework": "" + id, "name": "" + name, "type": "control"}).toArray (function (err, result)
			{
				
				res.send (result);
			});
		
		db.close ();
	});
};

exports.addFrameworkControl = function(req, res) {
    var framework = req.body;
    console.log('Adding framework: ' + JSON.stringify(framework));
    db.collection('frameworks', function(err, collection) {
        collection.insert(framework, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred while adding.'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateFrameworkControlByIdAndName = function(req, res) {
    var id = req.params.id;
    var framework = req.body;
    console.log('Updating framework: ' + id);
    console.log(JSON.stringify(framework));
    db.collection('frameworks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, framework, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating framework: ' + err);
                res.send({'error':'An error has occurred while updating'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(framework);
            }
        });
    });
}

exports.deleteFrameworkControlsByIdAndName = function(req, res) {
    var id = req.params.id;
    var name = req.params.name;
    console.log('Deleting framework control: ' + id + ' and Name: ' + name );
    db.collection('frameworks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}