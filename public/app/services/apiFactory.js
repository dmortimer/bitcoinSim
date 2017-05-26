var app = angular.module('coinMod');
//"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//[65, 59, 80, 81, 56, 55, 40]
app.factory('apiFactory', function($http) {
    var obj = {};
    var historicalData;
    var histSubArray = [];
    var currPrice;
    var user = {
        username: 'testuser',
        password: '12345',
        startingCash: 30000,
        startingCoins: 0,
        assets: [],
        accountDate: new Date(2017, 0, 0, 8, 30, 32, 0),
        transactions: [
            {
              date: new Date(2017, 0, 1, 9, 30, 32, 0),
              coinChainge: 0,
              numCoins: 0,
              cash: 30000
            },
            {
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
        ],
        personalHistory: {
            dates: [],
            displayDates: [],
            cash: [],
            coins: [],
            historical: [],
            values: []
        },
        populateAssets: function () {
          if (user.transactions.length === 0) {
            this.assets[0] = this.startingCash;
            this.assets[1] = this.startingCoins;
          } else {
            this.assets[0] = this.transactions[this.transactions.length - 1].cash;
            this.assets[1] = this.transactions[this.transactions.length - 1].numCoins;
          }
        }
    };
    user.populateAssets();
    obj.populatePersonalHistory = function() {
        var firstDate = user.accountDate;
        var lastDate = new Date();
        var lastDate = new Date(lastDate.setDate(lastDate.getDate() - 2));
        var currDate = firstDate;

        while (currDate < lastDate) {
            user.personalHistory.dates.push(currDate);
            currDate = new Date(currDate.setDate(currDate.getDate() + 1));
            user.personalHistory.displayDates.push(currDate.toISOString().substring(0,10));
        }
        var findi = 0;
        for (var i = 0; i < user.personalHistory.dates.length; i++) {
            if (user.transactions.find(function(object) {
                    return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                user.personalHistory.cash.push(user.transactions[findi].cash);
                findi++;
            } else {
                user.personalHistory.cash.push(user.personalHistory.cash[user.personalHistory.cash.length - 1]);
            }
        }

        var findj = 0;

        for (var i = 0; i < user.personalHistory.dates.length; i++) {
            if (user.transactions.find(function(object) {
                    return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                })) {
                user.personalHistory.coins.push(user.transactions[findj].numCoins);
                findj++;
            } else {
                user.personalHistory.coins.push(user.personalHistory.coins[user.personalHistory.coins.length - 1]);
            }
        }
    };


    obj.populatePersonalHistory();
    obj.getCurrentAssets = function() {
        return user.assets;
    };
    obj.getPersonalHistoryDates = function() {
        return user.personalHistory.displayDates;
    };
    obj.getPersonalHistoryValues = function() {
        return user.personalHistory.values;
    };
    obj.buyCoin = function(numBuy) {
        user.transactions.push({
          date: new Date(),
          coinChange: numBuy,
          numCoins: user.transactions[user.transactions.length - 1].numCoins + numBuy,
          cash: user.transactions[user.transactions.length - 1].cash - (numBuy * currPrice)
        });
        user.populateAssets();
        console.log(user.transactions);
        return user.assets;
    };
    obj.sellCoin = function(numSell) {
        user.transactions.push({
          date: new Date(),
          coinChange: -numSell,
          numCoins: user.transactions[user.transactions.length - 1].numCoins - numSell,
          cash: user.transactions[user.transactions.length - 1].cash + (numSell * currPrice)
        });
        user.populateAssets();
        console.log(user.transactions);
        return user.assets;
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

                return user.accountDate.getFullYear() === object.price_date.getFullYear() && user.accountDate.getMonth() === object.price_date.getMonth() && user.accountDate.getDate() === object.price_date.getDate();
            }));
            histSubArray.forEach(function(object){
                user.personalHistory.historical.push(object.price)
            });
            for(var i = 0; i < user.personalHistory.dates.length; i++){
                user.personalHistory.values.push((user.personalHistory.coins[i] * user.personalHistory.historical[i]) + user.personalHistory.cash[i])
            };
            console.log(user.personalHistory);

            return response.data;
        }).catch(function(error) {
            console.log(error);
            return "Issue retrieving historical data";
        });
    };
    console.log(user.transactions);
    return obj;
});
