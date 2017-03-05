var express = require('express'),
    wine = require('./routes/api');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/framework', framework.findAll);
app.get('/framework/:id', framework.findById);
app.post('/framework', framework.addWine);
app.put('/framework/:id', framework.updateWine);
app.delete('/framework/:id', framework.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');