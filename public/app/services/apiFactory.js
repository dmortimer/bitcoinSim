var app = angular.module('coinMod');
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
          //note that all transaction dates need to have an added 1 day to compensate for timezone BS
          {
            date: new Date(2017, 0, 1, 9, 30, 32, 0),
            coinChainge: 0,
            numCoins: 0,
            price: 997.6888,
            cash: 30000
          },
          {
              date: new Date(2017, 0, 1, 9, 33, 32, 0),
              coinChainge: 3,
              numCoins: 3,
              price: 997.6888,
              cash: 27006.9336
          },
          {
              date: new Date(2017, 0, 1, 10, 30, 32, 0),
              coinChange: -2,
              numCoins: 1,
              price: 997.6888,
              cash: 29002.3112
          },
          {
              date: new Date(2017, 2, 2, 8, 30, 32, 0),
              coinChange: 4,
              numCoins: 5,
              price: 1260.924,
              cash: 23958.6152
          },
          {
              date: new Date(2017, 2, 2, 8, 30, 33, 0),
              coinChange: -5,
              numCoins: 0,
              price: 1260.924,
              cash: 30263.2352
          },
          {
              date: new Date(2017, 3, 26, 8, 30, 32, 0),
              coinChange: 2,
              numCoins: 2,
              price: 1284.845,
              cash: 27693.5452
          },
          {
              date: new Date(2017, 3, 27, 8, 30, 32, 0),
              coinChange: 2,
              numCoins: 4,
              price: 1329.19,
              cash: 25035.1652
          },
          {
              date: new Date(2017, 3, 27, 8, 30, 40, 0),
              coinChange: -2,
              numCoins: 2,
              price: 1329.19,
              cash: 27693.5452
          },
          {
              date: new Date(2017, 3, 27, 8, 30, 45, 0),
              coinChange: -2,
              numCoins: 0,
              price: 1329.19,
              cash: 30351.9252
          },
          {
              date: new Date(2017, 3, 27, 8, 30, 59, 0),
              coinChange: 10,
              numCoins: 10,
              price: 1329.19,
              cash: 17060.0252
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
          this.assets[0] = this.transactions[this.transactions.length - 1].cash;
          this.assets[1] = this.transactions[this.transactions.length - 1].numCoins;
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
        for (var i = 0; i < user.personalHistory.dates.length; i++) {
          var tempArray = user.transactions.slice();
          var tempHolder = [];
          var tempObj;
          if (tempArray.find(function(object) {
            return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
              })) {
                while (tempArray.find(function(object) {
                  tempObj = object;
                  return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                    })) {
                      tempHolder.push(tempObj);
                      tempArray.splice(tempArray.indexOf(tempObj), 1);
                }
              user.personalHistory.cash.push(tempHolder[tempHolder.length - 1].cash);
          } else {
            user.personalHistory.cash.push(user.personalHistory.cash[user.personalHistory.cash.length - 1]);
          }
        }

        for (var i = 0; i < user.personalHistory.dates.length; i++) {
          var tempArray = user.transactions.slice();
          var tempHolder = [];
          var tempObj;
          if (tempArray.find(function(object) {
            return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
              })) {
                while (tempArray.find(function(object) {
                  tempObj = object;
                  return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                    })) {
                      tempHolder.push(tempObj);
                      tempArray.splice(tempArray.indexOf(tempObj), 1);
                }
              user.personalHistory.coins.push(tempHolder[tempHolder.length - 1].numCoins);
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
            console.log(histSubArray);
            for (var i = 0; i < user.personalHistory.dates.length; i++) {
              var tempArray = user.transactions.slice();
              var tempHolder = [];
              var tempObj;
              if (tempArray.find(function(object) {
                return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                  })) {
                    while (tempArray.find(function(object) {
                      tempObj = object;
                      return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                        })) {
                          tempHolder.push(tempObj);
                          tempArray.splice(tempArray.indexOf(tempObj), 1);
                    }
                  user.personalHistory.historical.push(tempHolder[tempHolder.length - 1].price);
              } else {
                var histRecord = histSubArray.find(function(object) {
                  return user.personalHistory.dates[i].getFullYear() === object.price_date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.price_date.getMonth() && user.personalHistory.dates[i].getDate() === object.price_date.getDate();
                });
                user.personalHistory.historical.push(histRecord.price);
              }
            }
            for(var i = 0; i < user.personalHistory.dates.length; i++){
                user.personalHistory.values.push(((user.personalHistory.coins[i] * user.personalHistory.historical[i]) + user.personalHistory.cash[i]).toFixed(2))
            };

            return response.data;
        }).catch(function(error) {
            console.log(error);
            return "Issue retrieving historical data";
        });
    };
    return obj;
});
//days with transactions are based off curr price variables that will be stored in the transaction object
//days without transactions will use  daily historical average from database
