var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, apiFactory) {
  $scope.getCurrentPrice = function () {
    apiFactory.getCurrentPrice().then(function (response) {
      $scope.currentPrice = response;
      console.log('CoinDesk BPI real-time:');
      console.log($scope.currentPrice);
    });
  };
  $scope.getCurrentPrice();
  $interval(function () {
    $scope.getCurrentPrice();
  }, 20000);
  $scope.getCurrentAssets = function () {
    $scope.assets = apiFactory.getCurrentAssets();
  }
  $scope.getCurrentAssets();
  $scope.buyCoin = function () {
    $scope.assets = apiFactory.buyCoin();
  };
  $scope.sellCoin = function () {
    $scope.assets = apiFactory.sellCoin();
  };
});
