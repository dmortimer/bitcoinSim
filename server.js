var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
var port = process.env.PORT || 8080;
var pool = new pg.Pool;

app.use(express.static(path.join(__dirname, '/public')));

// app.get('/', function (req, res) {
//   res.send('Bitcoin Simulator');
// });

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
