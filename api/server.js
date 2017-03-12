var express = require('express'),
framework = require('./routes/api');
<<<<<<< HEAD
framework.setup;
=======
>>>>>>> refs/remotes/ashwinaltekar/master

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/api/frameworks', framework.findAll);
app.get('/api/frameworks/:id', framework.findById);
app.post('/api/frameworks', framework.addFramework);
app.put('/api/frameworks/:id', framework.updateFrameworkById);
app.delete('/api/frameworks/:id', framework.deleteFrameworkById);

app.get('/api/frameworks/:id/controls', framework.findAllFrameworkControls);
app.get('/api/frameworks/:id/controls/:name', framework.findFrameworkControlByIdAndName);
app.post('/api/frameworks/:id/controls', framework.addFrameworkControl);
app.put('/api/frameworks/:id/controls/:name', framework.updateFrameworkControlByIdAndName);
app.delete('/api/frameworks/:id/controls/:name', framework.deleteFrameworkControlsByIdAndName);

app.listen(3000);
console.log('Listening on port 3000...');