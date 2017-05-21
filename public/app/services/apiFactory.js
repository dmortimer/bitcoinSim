var app = angular.module('coinMod');

app.factory('apiFactory', function ($http) {
  $http.get('http://api.coindesk.com/v1/bpi/currentprice.json').then(function (data) {
    console.log('CoinDesk BPI real-time:');
    console.log(data);
  });
  $http.get('http://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2017-05-21').then(function (data) {
    console.log('CoinDesk historical BPI data:');
    console.log(data);
  });
  var obj = {};
  return obj;
})
