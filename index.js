var req = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var express = require('express');
var app = express();
var upload = multer(); // for parsing multipart/form-data
var pg = require('pg');

var MANIFEST_FILE = path.join(__dirname, 'build/manifest.json');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(request, response) {
	response.send("hi!");
});

app.get('/manifest.json', function(req, res) {
  fs.readFile(MANIFEST_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.set('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
