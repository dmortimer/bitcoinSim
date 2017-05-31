var app = angular.module('coinMod', ["ui.router", "ui.bootstrap"]);

app.directive('transxnTable', function() {
  return {
    restrict: 'E',
    replace: false,
    templateUrl:'views/trxnTable.html'
  }
})
