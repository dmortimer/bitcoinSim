var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, apiFactory) {
  $scope.getCurrentPrice = function () {
    apiFactory.getCurrentPrice().then(function (response) {
      $scope.currentPrice = response;
      // console.log('CoinDesk BPI real-time:');
      // console.log($scope.currentPrice);
    });
  };
  $scope.getCurrentPrice();
  $interval(function () {
  $scope.getCurrentPrice();
  }, 20000);
  $scope.getCurrentAssets = function () {
    $scope.assets = apiFactory.getCurrentAssets();
    // console.log($scope.assets);
  }
  $scope.getCurrentAssets();
  $scope.buyCoin = function (numBuy) {
    if(($scope.currentPrice * numBuy) < $scope.assets[0] ){
    $scope.assets = apiFactory.buyCoin(numBuy);
    $scope.buyModal=false;
  }
    else {
      return $scope.assets;
    }
  };
  $scope.sellCoin = function (numSell) {
    if (numSell <= $scope.assets[1] ){
      $scope.assets = apiFactory.sellCoin(numSell);
      $scope.sellModal=false;
    }
    else {
      return $scope.assets;
    }
  };
  $scope.transactions = apiFactory.getTransactionData();
  $scope.date= new Date();
  $scope.user = apiFactory.getUserInfo();

});
