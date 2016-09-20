var req = require('request');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var express = require('express');
var app = express();
var upload = multer(); // for parsing multipart/form-data
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(request, response) {
  response.send("hi!");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
