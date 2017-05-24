var app = angular.module('coinMod');

app.controller('hgraphController', function ($scope, $interval, apiFactory) {
    $scope.hprice=[];
     $scope.hdate=[];
     $scope.getHistoricalData = function () {
       apiFactory.getHistoricalData().then(function (response) {
         $scope.historicalData = response;
         console.log('CoinDesk historical BPI data:');
        //  console.log(response);
         angular.forEach($scope.historicalData, function(point){
           $scope.hdate.push(point.price_date);
           $scope.hprice.push(point.price);
        //    console.log($scope.hprice);
        //    console.log($scope.hdate);
         });
       });
     };
var ctx = document.getElementById("line-chart");
var lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: $scope.hdate,
    datasets: [
        {
            label: "Past Bitcoin Price",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: $scope.hprice,
            spanGaps: false
        }
    ]
  }
});
$scope.getHistoricalData();
});
