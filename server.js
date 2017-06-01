var express = require('express');
var pool = require('./pg-connection-pool')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

//Finds file path to server static files, get('/')
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json())

//get data from database
app.get('/api/history', function (req, res) {
  pool.query("SELECT * FROM coinData").then(function (result) {
    res.send(result.rows);
  });
});

app.get('/api/user', function (req, res) {
  pool.query("SELECT * FROM userData").then(function (result) {
    res.send(result.rows);
  }).catch(function (error) {
    console.log(error);
  });
});

app.get('/api/user/:info', function (req, res) {
  var userInfo = req.params.info.split(',');
  var sql = "SELECT * FROM userData WHERE uname = $1::text and pass = $2::text";
  var values = userInfo;
  pool.query(sql, values).then(function (result) {
    res.send(result.rows);
  }).catch(function (error) {
    console.log(error);
  });
});

app.put('/api/user/:user', function (req, res) {
  var sql = "UPDATE userData SET everything=$2::text WHERE uname=$1::text";
  var values = [req.params.user, JSON.stringify(req.body)];
  pool.query(sql, values).then(function () {
    pool.query("SELECT * FROM userData").then(function (result) {
      res.send(result.rows);
    });
  }).catch(function () { res.send('Error')});
});

//hosts the server on port 8080 or process.env.PORT
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
