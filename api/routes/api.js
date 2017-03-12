var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('DatabaseName', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'DatabaseName' database");
        db.collection('frameworks', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'frameworks' collection doesn't exist.");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving framework: ' + id);
    db.collection('frameworks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
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

exports.updateFramework = function(req, res) {
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

exports.deleteFramework = function(req, res) {
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