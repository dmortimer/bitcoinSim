var app = angular.module('coinMod');

app.factory('apiFactory', function ($http) {
  var obj = {};
  var currPrice;
  var prevPrice;
  var assets = [30000, 0];
  obj.getCurrentAssets = function () {
    return assets;
  };
  obj.buyCoin = function () {
    assets[0] -= currPrice;
    assets[1]++;
    return assets;
  };
  obj.getCurrentPrice = function () {
    return $http({
      method: 'GET',
      url: 'https://api.coindesk.com/v1/bpi/currentprice.json'
    }).then(function (response) {
      currPrice = parseFloat(response.data.bpi.USD.rate.replace(',', ''));
      prevPrice = currPrice;
      return currPrice;
    }).catch(function (error) {
      console.log(error);
      return prevPrice;
    });
  };
  obj.getHistoricalData = function () {
    return $http({
      method: 'GET',
      url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2017-05-21'
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
      return "Dummy Value for Now";
    });
  };
  return obj;
})
