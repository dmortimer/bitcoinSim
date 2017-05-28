var app = angular.module('coinMod');

app.controller('wGraphController', function ($scope, $interval, apiFactory) {
    var monthlyPrices = [];
    var monthlyDates = [];
    var weeklyPrices = [];
    var weeklyDates = [];
    var yearlyPrices = [];
    var yearlyDates = [];
    var hprice = [];
    var hdate = [];
    var todayYear = new Date();
    var yearBack = new Date(todayYear.setDate(todayYear.getDate() - 365));
    var todayMonth = new Date();
    var monthBack = new Date(todayMonth.setDate(todayMonth.getDate() - 31));
    var todayWeek = new Date();
    var weekBack = new Date(todayWeek.setDate(todayWeek.getDate() - 7));

     $scope.getHistoricalData = function () {
       apiFactory.getHistoricalData().then(function (response) {
         $scope.historicalData = response;
        //  console.log('CoinDesk historical BPI data:');
        //  console.log(response);
         angular.forEach($scope.historicalData, function(point){
           hdate.push(point.price_date.toISOString().substring(0,10));
           hprice.push(point.price);
        //    console.log(hprice);
        //    console.log(hdate);
         });
         var weekIndex = $scope.historicalData.findIndex(function(object) {
           return weekBack.getFullYear() === object.price_date.getFullYear() && weekBack.getMonth() === object.price_date.getMonth() && weekBack.getDate() === object.price_date.getDate();
         });
         for (var i = weekIndex; i < $scope.historicalData.length; i++){
          weeklyPrices.push($scope.historicalData[i].price);
          weeklyDates.push($scope.historicalData[i].price_date.toISOString().substring(0,10));
         }
         var monthIndex = $scope.historicalData.findIndex(function(object) {
           return monthBack.getFullYear() === object.price_date.getFullYear() && monthBack.getMonth() === object.price_date.getMonth() && monthBack.getDate() === object.price_date.getDate();
         });
         for (var i = monthIndex; i < $scope.historicalData.length; i++){
          monthlyPrices.push($scope.historicalData[i].price);
          monthlyDates.push($scope.historicalData[i].price_date.toISOString().substring(0,10));
         }
         var yearIndex = $scope.historicalData.findIndex(function(object) {
           return yearBack.getFullYear() === object.price_date.getFullYear() && yearBack.getMonth() === object.price_date.getMonth() && yearBack.getDate() === object.price_date.getDate();
         });
         for (var i = yearIndex; i < $scope.historicalData.length; i++){
          yearlyPrices.push($scope.historicalData[i].price);
          yearlyDates.push($scope.historicalData[i].price_date.toISOString().substring(0,10));
         }
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
        $scope.getHistoricalData();
  });
