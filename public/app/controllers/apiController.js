var app = angular.module('coinMod');

app.controller('apiController', function ($scope, $interval, $location, apiFactory) {
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
  // var userInfo = ['testuser', '12345'];
  $scope.populateUser = function (userInfo) {
    apiFactory.getUser(userInfo).then(function (response) {
      if (response) {
        $scope.getCurrentAssets();
        $scope.transactions = apiFactory.getTransactionData();
        $scope.user = apiFactory.getUserInfo();
        $location.path("dashboard");
        $scope.login.username = null;
        $scope.login.password = null;
      } else {
        $scope.loginError = true;
      }
    });
  };
  $scope.signup = function (userInfo) {
    apiFactory.signup(userInfo).then(function (response) {
      if (response) {
        $scope.getCurrentAssets();
        $scope.transactions = apiFactory.getTransactionData();
        $scope.user = apiFactory.getUserInfo();
        $location.path("dashboard");
        $scope.sign.username = null;
        $scope.sign.password = null;
        $scope.sign.name = null;
        $scope.sign.email = null;
      } else {
        $scope.signUpError = true;
      }
    });
  };
});
