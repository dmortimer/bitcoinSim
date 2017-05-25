var app = angular.module('coinMod');
//"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//[65, 59, 80, 81, 56, 55, 40]
app.factory('apiFactory', function($http) {
    var obj = {};
    var historicalData;
    var histSubArray = [];
    var personalHistory = {
        dates: [],
        cash: [],
        coins: [],
        historical: [],
        values: []
    };
    var currPrice;
    var testUser = {
        username: 'testuser',
        password: '12345',
        startingCash: 30000,
        startingCoins: 0,
        assets: [30000, 0],
        accountDate: new Date(2017, 0, 0, 8, 30, 32, 0),
        history: [{
                date: new Date(2017, 0, 3, 8, 30, 32, 0),
                type: "buy",
                numCoins: 3,
                cash: 26944.5
            },
            {
                date: new Date(2017, 0, 15, 8, 30, 32, 0),
                type: "sell",
                numCoins: 2,
                cash: 28581.76
            },
            {
                date: new Date(2017, 2, 1, 8, 30, 32, 0),
                type: "buy",
                numCoins: 4,
                cash: 23538.08
            },
            {
                date: new Date(2017, 2, 15, 8, 30, 32, 0),
                type: "sell",
                numCoins: 5,
                cash: 29402.58
            },
            {
                date: new Date(2017, 3, 25, 8, 30, 32, 0),
                type: "buy",
                numCoins: 2,
                cash: 26832.9
            }
        ]
    };

    obj.populatePersonalHistory = function() {
        var firstDate = testUser.accountDate;
        var lastDate = new Date();
        var lastDate = new Date(lastDate.setDate(lastDate.getDate() - 2));
        var currDate = firstDate;

        while (currDate < lastDate) {
            personalHistory.dates.push(currDate);
            currDate = new Date(currDate.setDate(currDate.getDate() + 1));
        }

        var findi = 0;

        for (var i = 0; i < personalHistory.dates.length; i++) {
            if (testUser.history.find(function(object) {
                    return personalHistory.dates[i].getFullYear() === object.date.getFullYear() && personalHistory.dates[i].getMonth() === object.date.getMonth() && personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                if (i === 0) {
                    personalHistory.cash.push(testUser.startingCash);
                } else {
                    personalHistory.cash.push(testUser.history[findi].cash);
                    findi++;
                }
            } else {
                if (i === 0) {
                    personalHistory.cash.push(testUser.startingCash);
                } else {
                    personalHistory.cash.push(personalHistory.cash[personalHistory.cash.length - 1]);
                }
            }
        }

        var findj = 0;

        for (var i = 0; i < personalHistory.dates.length; i++) {
            if (testUser.history.find(function(object) {
                    return personalHistory.dates[i].getFullYear() === object.date.getFullYear() && personalHistory.dates[i].getMonth() === object.date.getMonth() && personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                if (i === 0) {
                    personalHistory.coins.push(testUser.startingCoins);
                } else {
                    personalHistory.coins.push(testUser.history[findj].numCoins);
                    findj++;
                }
            } else {
                if (i === 0) {
                    personalHistory.coins.push(testUser.startingCoins);
                } else {
                    personalHistory.coins.push(personalHistory.coins[personalHistory.coins.length - 1]);
                }
            }
        }
    };


    obj.populatePersonalHistory();
    obj.getCurrentAssets = function() {
        return testUser.assets;
    };
    obj.getPersonalHistoryDates = function() {
        return personalHistory.dates;
    };
    obj.getPersonalHistoryValues = function() {
        return personalHistory.values;
    };
    obj.buyCoin = function(numBuy) {
        testUser.assets[0] -= (currPrice * numBuy);
        testUser.assets[1] += numBuy;
        testUser.history.push({
            date: new Date(),
            type: "buy",
            numCoins: numBuy
        });
        return testUser.assets;
    };
    obj.sellCoin = function(numSell) {
        testUser.assets[0] += (currPrice * numSell);
        testUser.assets[1] -= numSell;
        testUser.history.push({
            date: new Date(),
            type: "sell",
            numCoins: numSell
        });
        return testUser.assets;
    };
    obj.getCurrentPrice = function() {
        return $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
        }).then(function(response) {
            currPrice = parseFloat(response.data.bpi.USD.rate.replace(',', ''));
            return currPrice;
        }).catch(function(error) {
            console.log(error);
            return currPrice;
        });
    };
    obj.getHistoricalData = function() {
        return $http({
            method: 'GET',
            url: '/api/history'
        }).then(function(response) {
            response.data.forEach(function(item) {
                item.price_date = new Date(item.price_date);
            });
            historicalData = response.data;
            histSubArray= historicalData.slice(historicalData.findIndex(function(object){

                return testUser.accountDate.getFullYear() === object.price_date.getFullYear() && testUser.accountDate.getMonth() === object.price_date.getMonth() && testUser.accountDate.getDate() === object.price_date.getDate();
            }));
            histSubArray.forEach(function(object){
                personalHistory.historical.push(object.price)
            });
            for(var i = 0; i < personalHistory.dates.length; i++){
                personalHistory.values.push((personalHistory.coins[i] * personalHistory.historical[i])+personalHistory.cash[i])
            };
            console.log(personalHistory);

            return response.data;
        }).catch(function(error) {
            console.log(error);
            return "Issue retrieving historical data";
        });
    };
    return obj;
});
