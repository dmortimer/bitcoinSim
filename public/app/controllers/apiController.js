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
    console.log($scope.assets);
  }
  $scope.getCurrentAssets();
  $scope.buyCoin = function (numBuy) {
    if(($scope.currentPrice * numBuy) < $scope.assets[0] ){
    $scope.assets = apiFactory.buyCoin(numBuy);
    $scope.buyModal=false;
  }
    else {
      alert ('Insufficient Funds');
      return $scope.assets;
    }
  };
  $scope.sellCoin = function (numSell) {
    if (numSell <= $scope.assets[1] ){
      $scope.assets = apiFactory.sellCoin(numSell);
      $scope.sellModal=false;
    }
    else {
      alert ('There is only ฿ ' + $scope.assets[1] + '.00 coins in your wallet');
      return $scope.assets;
    }
  };
  $scope.transactions = apiFactory.getTransactionData();
    $scope.transactionStuff = function() {
        $scope.transactions.forEach(function(i) {
            if (i.coinChange == 0) {
                i.type = "Acount Created"
            } else if (i.coinChange > 0) {
                i.type = "Bought"
            } else if (i.coinChange < 0) {
                i.type = "Sold"
            };
            console.log(i.type);
            i.displayDate = i.date.toISOString().substring(0,10);
            console.log(i.displayDate);
        });

    };
    $scope.transactionStuff();

});
