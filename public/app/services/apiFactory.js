var app = angular.module('coinMod');

app.factory('apiFactory', function ($http) {
  var obj = {};
  var prevPrice;
  obj.getCurrentPrice = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
    }).then(function (response) {
      prevPrice = response.data.bpi.USD.rate;
      return response.data.bpi.USD.rate;
    }).catch(function (error) {
      console.log(error);
      return prevPrice;
    });
  };
  obj.getHistoricalData = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2017-05-21'
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
      return "Dummy Value for Now";
    });
  };
  return obj;
})
