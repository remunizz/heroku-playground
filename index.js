var req = require('request');
var fs = require("fs");
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

app.get('/data', ( request, response ) => {
	pg.connect(process.env.DATABASE_URL, (err, client, done) => {
	  client.query('SELECT * FROM ' + process.env.DATABASE_NAME + ' where status = 1 order by time desc LIMIT(10)', (err, result) => {
			done();

			if (err){
			  console.error(err);
				response.send("Error " + err);
			}else{
				response.send( result.rows );
			}
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
