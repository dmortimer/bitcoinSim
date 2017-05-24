var app = angular.module('coinMod');

app.factory('apiFactory', function ($http) {
  var obj = {};
  var currPrice;
  var assets = [30000, 0];
  obj.getCurrentAssets = function () {
    return assets;
  };
  obj.buyCoin = function () {
    assets[0] -= currPrice;
    assets[1]++;
    return assets;
  };
  obj.sellCoin = function () {
    assets[0] += currPrice;
    assets[1]--;
    return assets;
  };
  obj.getCurrentPrice = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
    }).then(function (response) {
      currPrice = parseFloat(response.data.bpi.USD.rate.replace(',', ''));
      return currPrice;
    }).catch(function (error) {
      console.log(error);
      return currPrice;
    });
  };
  obj.getHistoricalData = function () {
    return $http({
      method: 'GET',
      url: '/api/history'
    }).then(function (response) {
      response.data.forEach(function (item) {
        item.price_date = new Date(item.price_date);
      });
      return response.data;
    }).catch(function (error) {
      console.log(error);
      return "Issue retrieving historical data";
    });
  };
  return obj;
})
