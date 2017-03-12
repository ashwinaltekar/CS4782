var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var ObjectId = require('mongodb').ObjectID;

var server = new Server('ds119370.mlab:19370.com', 19370, {auto_reconnect: true});
db = new Db('cs4782', server);

/**
 * Error handling for connection and collection.
 **/
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'cs4782' database");
        db.collection('frameworks', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'frameworks' collection doesn't exist.");
            }
        });
    }
});


/**
 * Functions to handle the base framework mappings.
 * Needs data and tweak.
 **/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving framework: ' + id);
    db.collection('frameworks', function(err, collection) {
        collection.find({"_id": new ObjectId(id)}, function(err, item) {
            console.log(item);
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('frameworks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
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
}

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
 * Functions to handle the framework controls request mappings.
 **/
exports.findAllFrameworkControls = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving framework: ' + id);
    db.collection('frameworks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findFrameworkControlByIdAndName = function(req, res) {
    db.collection('frameworks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
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