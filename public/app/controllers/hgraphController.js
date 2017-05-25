var app = angular.module('coinMod');

app.controller('hgraphController', function ($scope, $interval, apiFactory) {
    var monthlyPrices = [];
    var monthlyDates = [];
    var weeklyPrices = [];
    var weeklyDates = [];
    var hprice=[];
    var hdate=[];
     $scope.getHistoricalData = function () {
       apiFactory.getHistoricalData().then(function (response) {
         $scope.historicalData = response;
         console.log('CoinDesk historical BPI data:');
         console.log(response);
         angular.forEach($scope.historicalData, function(point){
           hdate.push(point.price_date);
           hprice.push(point.price);
        //    console.log($scope.hprice);
        //    console.log($scope.hdate);
         });
         for (var i = 1; i <= $scope.historicalData.length; i = i+7){
          weeklyPrices.push($scope.historicalData[i].price);
          weeklyDates.push($scope.historicalData[i].price_date);
         }
         for (var i = 1; i <= $scope.historicalData.length; i = i+30){
          monthlyPrices.push($scope.historicalData[i].price);
          monthlyDates.push($scope.historicalData[i].price_date);
         }
         var ctx = document.getElementById("h-chart");
         var historicalChart = new Chart(ctx, {
           type: 'line',
           data: {
             labels: hdate,
             datasets: [
                 {
                     label: "Past Bitcoin Prices",
                     fill: true,
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
                     data: hprice,
                     spanGaps: false
                 }
             ]
           }
         });
         var chartM = document.getElementById("m-chart");
         var mChart = new Chart(chartM, {
           type: 'line',
           data: {
             labels: monthlyDates,
             datasets: [
                 {
                     label: "Monthly Bitcoin Prices",
                     fill: true,
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
                     data: monthlyPrices,
                     spanGaps: false
                 }
             ]
           }
         });
         var chartW = document.getElementById("w-chart");
         var wChart = new Chart(chartW, {
           type: 'line',
           data: {
             labels: weeklyDates,
             datasets: [
                 {
                     label: "Weekly Bitcoin Prices",
                     fill: true,
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
                     data: weeklyPrices,
                     spanGaps: false
                 }
             ]
           }
         });
       });
     };
      $scope.getHistoricalData()
});
