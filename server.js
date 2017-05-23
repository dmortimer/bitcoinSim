var express = require('express');
var pool = require('./pg-connection-pool')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/history', function (req, res) {
  pool.query("SELECT * FROM coinData").then(function (result) {
    res.send(result.rows);
  });
});

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
