var app = angular.module('coinMod');

app.controller('usergraphController', function($scope, $interval, apiFactory) {

    apiFactory.getHistoricalData().then(function() {
        var ctx = document.getElementById("user-chart");
        var userChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: apiFactory.getPersonalHistoryDates(),
                datasets: [{
                    label: "Account Value History",
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
                    data: apiFactory.getPersonalHistoryValues(),
                    spanGaps: false,
                    scaleStartValue: 0,
                    scaleOvverride: true
                }]
            },
            options: {

                responsive: true,
                tooltips: {
                    mode: 'x-axis',
                    intersect: true
                }
            }
        });
    });

});
