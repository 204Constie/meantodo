var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
// var bodyParser = require('body-parser');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(__dirname + '/public'));

app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(morgan('dev'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

app.listen(port);
console.log('listening on port: ', port);
