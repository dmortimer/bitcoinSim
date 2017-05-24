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
    if (assets[0] > currPrice){
      assets[0] -= currPrice;
      assets[1] ++;
      return assets;
    }
    else {
    alert ("You don't have enough funds");
    return assets;}
  };
  obj.sellCoin = function () {
    if (assets[1] > 0){
    assets[0] += currPrice;
    assets[1] --;
    return assets;
    }
    else {
      alert ('You have 0 coins in your wallet');
      return assets;
    }
  };
  obj.getCurrentPrice = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
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
