var app = angular.module('coinMod');
//"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//[65, 59, 80, 81, 56, 55, 40]
app.factory('apiFactory', function($http) {
    var obj = {};
    var historicalData;
    var histSubArray = [];
    var personalHistory = {
        dates: [],
        displayDates: [],
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
        transactions: [{
                date: new Date(2017, 0, 3, 8, 30, 32, 0),
                coinChainge: 3,
                numCoins: 3,
                cash: 26944.5
            },
            {
                date: new Date(2017, 0, 15, 8, 30, 32, 0),
                coinChange: -2,
                numCoins: 1,
                cash: 28581.76
            },
            {
                date: new Date(2017, 2, 1, 8, 30, 32, 0),
                coinChange: 4,
                numCoins: 5,
                cash: 23538.08
            },
            {
                date: new Date(2017, 2, 15, 8, 30, 32, 0),
                coinChange: -5,
                numCoins: 0,
                cash: 29402.58
            },
            {
                date: new Date(2017, 3, 25, 8, 30, 32, 0),
                coinChange: 2,
                numCoins: 2,
                cash: 26832.9
            }
        ]
    };

    obj.populatePersonalHistory = function() {
        var firstDate = testUser.accountDate;
        var lastDate = new Date();
        //updates 'lastDate' variable to go to yesterday for user account graph because we don't have today's historical data
        var lastDate = new Date(lastDate.setDate(lastDate.getDate() - 2));
        var currDate = firstDate;
        //generate dates from account creation to yesterday and pushes to personalHistory dates array
        while (currDate < lastDate) {
            personalHistory.dates.push(currDate);
            //incrementing to the next day
            currDate = new Date(currDate.setDate(currDate.getDate() + 1));
            //cuts string of date object and pushes to display dates array to be used as dates on x axis
            personalHistory.displayDates.push(currDate.toISOString().substring(0,10));
        }
        //loop to populate cash in personal history
        var findi = 0;
        for (var i = 0; i < personalHistory.dates.length; i++) {
            if (testUser.transactions.find(function(object) {
                    return personalHistory.dates[i].getFullYear() === object.date.getFullYear() && personalHistory.dates[i].getMonth() === object.date.getMonth() && personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                if (i === 0) {
                    personalHistory.cash.push(testUser.startingCash);
                } else {
                    personalHistory.cash.push(testUser.transactions[findi].cash);
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
        //loop to populate coins in perosnal history
        var findj = 0;
        for (var i = 0; i < personalHistory.dates.length; i++) {
            if (testUser.transactions.find(function(object) {
                    return personalHistory.dates[i].getFullYear() === object.date.getFullYear() && personalHistory.dates[i].getMonth() === object.date.getMonth() && personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                if (i === 0) {
                    personalHistory.coins.push(testUser.startingCoins);
                } else {
                    personalHistory.coins.push(testUser.transactions[findj].numCoins);
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
    //make api call to database on page load
    obj.populatePersonalHistory();
    //return asset values
    obj.getCurrentAssets = function() {
        return testUser.assets;
    };
    //return display dates for user account graph
    obj.getPersonalHistoryDates = function() {
        return personalHistory.displayDates;
    };
    //return total account values for user account graph
    obj.getPersonalHistoryValues = function() {
        return personalHistory.values;
    };
    //function to update coins and assets when coin is bought and log the transaction
    obj.buyCoin = function(numBuy) {
        testUser.assets[0] -= (currPrice * numBuy);
        testUser.assets[1] += numBuy;
        testUser.transactions.push({
            date: new Date(),
            type: "buy",
            numCoins: numBuy
        });
        return testUser.assets;
    };
    //function to update coins and assets when coin is sold and log the transaction
    obj.sellCoin = function(numSell) {
        testUser.assets[0] += (currPrice * numSell);
        testUser.assets[1] -= numSell;
        testUser.transactions.push({
            date: new Date(),
            type: "sell",
            numCoins: numSell
        });
        return testUser.assets;
    };
    //external api request to get current price of bitcoins by the minute
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
    //pulls historical data from database
    obj.getHistoricalData = function() {
        return $http({
            method: 'GET',
            url: '/api/history'
        }).then(function(response) {
            //turns dates from database into JavaScript date format
            response.data.forEach(function(item) {
                item.price_date = new Date(item.price_date);
            });
            //stores database response into historcalData variable
            historicalData = response.data;
            //finds the day the user created the account to the current date and selects those dates
            histSubArray = historicalData.slice(historicalData.findIndex(function(object){
                return testUser.accountDate.getFullYear() === object.price_date.getFullYear() && testUser.accountDate.getMonth() === object.price_date.getMonth() && testUser.accountDate.getDate() === object.price_date.getDate();
            }));
            //populate personal History array with historical prices for past calculations
            histSubArray.forEach(function(object){
                personalHistory.historical.push(object.price)
            });
            //actually calculate historical account values based on historical prices, number of coins held in the past, and cash in account in the past and push those to the personal history values array
            for(var i = 0; i < personalHistory.dates.length; i++){
                personalHistory.values.push((personalHistory.coins[i] * personalHistory.historical[i]) + personalHistory.cash[i])
            };
            return response.data;
        }).catch(function(error) {
            console.log(error);
            return "Issue retrieving historical data";
        });
    };
    return obj;
});
