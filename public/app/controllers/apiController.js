var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, apiFactory) {
  $scope.getCurrentPrice = function () {
    apiFactory.getCurrentPrice().then(function (response) {
      $scope.currentPrice = response;
    });
  };
  $scope.date= new Date();
  $scope.getCurrentPrice();
  $interval(function () {
  $scope.getCurrentPrice();
  }, 20000);
  $scope.getCurrentAssets = function () {
    $scope.assets = apiFactory.getCurrentAssets();
  }
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

  $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term


  apiFactory.getUser().then(function () {
    $scope.getCurrentAssets();
    $scope.transactions = apiFactory.getTransactionData();
    $scope.user = apiFactory.getUserInfo();
  });

});
