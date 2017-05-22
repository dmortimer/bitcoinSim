var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, apiFactory) {
  $scope.getCurrentPrice = function () {
    apiFactory.getCurrentPrice().then(function (response) {
      $scope.currentPrice = response;
      console.log('CoinDesk BPI real-time:');
      console.log($scope.currentPrice);
    });
  }
  $scope.getCurrentPrice();
  $interval(function () {
    $scope.getCurrentPrice();
  }, 5000);
  apiFactory.getHistoricalData().then(function (response) {
    console.log('CoinDesk historical BPI data:');
    console.log(response);
  });
});
