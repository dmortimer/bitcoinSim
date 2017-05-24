var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, apiFactory) {
  $scope.getCurrentPrice = function () {
    apiFactory.getCurrentPrice().then(function (response) {
      $scope.currentPrice = response;
      console.log('CoinDesk BPI real-time:');
      console.log($scope.currentPrice);
    });
  };
  $scope.getHistoricalData = function () {
    apiFactory.getHistoricalData().then(function (response) {
      $scope.historicalData = response;
      console.log('CoinDesk historical BPI data:');
      console.log(response);
    });
  };
  $scope.getCurrentPrice();
  $interval(function () {
    $scope.getCurrentPrice();
  }, 20000);
  $scope.getHistoricalData();
  $scope.getCurrentAssets = function () {
    $scope.assets = apiFactory.getCurrentAssets();
  }
  $scope.getCurrentAssets();
  $scope.buyCoin = function (numBuy) {
    $scope.assets = apiFactory.buyCoin(numBuy);
  };
  $scope.sellCoin = function (numSell) {
    $scope.assets = apiFactory.sellCoin(numSell);
  };
});
