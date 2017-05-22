var express = require('express');
var pool = require('./pg-connection-pool')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public')));

pool.query("SELECT * FROM coinData").then(function (result) {
  console.log(result);
});

// app.get('/', function (req, res) {
//   res.send('Bitcoin Simulator');
// });

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
