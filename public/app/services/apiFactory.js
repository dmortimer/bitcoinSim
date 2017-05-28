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
        //populates assets property based on most recent transaction
        populateAssets: function () {
          this.assets[0] = this.transactions[this.transactions.length - 1].cash;
          this.assets[1] = this.transactions[this.transactions.length - 1].numCoins;
        }
    };
    //populate assets on page load
    user.populateAssets();
    //method to populate user.peronalHistory with dates, display dates, cash amounts, and coin amounts based on user account information and transaction history
    obj.populatePersonalHistory = function() {
        var firstDate = user.accountDate;
        var lastDate = new Date();
        var lastDate = new Date(lastDate.setDate(lastDate.getDate() - 2));
        var currDate = firstDate;
        //populate personal history dates and display dates arrays
        while (currDate < lastDate) {
            user.personalHistory.dates.push(currDate);
            currDate = new Date(currDate.setDate(currDate.getDate() + 1));
            user.personalHistory.displayDates.push(currDate.toISOString().substring(0,10));
        }
        //populate personal history cash amounts
        for (var i = 0; i < user.personalHistory.dates.length; i++) {
          //create temporary array to hold shallow copy of transactions so irrelevant transactions can be removed
          var tempArray = user.transactions.slice();
          //array to hold all transactions from the same day after they've been removed from tempArray
          var tempHolder = [];
          //variable to hold object pulled from tempArray.find
          var tempObj;
          //check to see if the date for this iteration of the loop through the personal history dates has transactions
          if (tempArray.find(function(object) {
            return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
              })) {
                //if there are transactions for this date, store the transaction in the tempObj
                while (tempArray.find(function(object) {
                  tempObj = object;
                  return user.personalHistory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
                    })) {
                      //also push the transaction to the tempHolder array
                      tempHolder.push(tempObj);
                      //then remove the transaction from the tempArray so it doesn't get found on the next iteration of the while loop, which will also prevent the loop from being infinite
                      tempArray.splice(tempArray.indexOf(tempObj), 1);
                }
              //now that all of the transactions for this date are in the tempHolder array, find the last one in the array and push the cash amount to the personal history cash array. What we're doing here is getting the information from the last transaction of the day and ignoring all earlier transactions for that day
              user.personalHistory.cash.push(tempHolder[tempHolder.length - 1].cash);
          } else {
            //if there wasn't a transaction on the date in question, just grab the cash value from the day before
            user.personalHistory.cash.push(user.personalHistory.cash[user.personalHistory.cash.length - 1]);
          }
        }
        //same as above but for coins
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
    //buy coin function that logs transaction
    obj.buyCoin = function(numBuy) {
      //TODO BE ON THE LOOKOUT FOR ISSUES WITH LOGGING THE DATE AND THE TIMEZONE PROBLEM
        user.transactions.push({
          date: new Date(),
          coinChange: numBuy,
          numCoins: user.transactions[user.transactions.length - 1].numCoins + numBuy,
          cash: user.transactions[user.transactions.length - 1].cash - (numBuy * currPrice)
        });
        user.populateAssets();
        return user.assets;
    };
    //same as above but for sell
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
    //Pull the current price from the coindesk api
    obj.getCurrentPrice = function() {
        return $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
        }).then(function(response) {
          //convert the price string to a javascript number
            currPrice = parseFloat(response.data.bpi.USD.rate.replace(',', ''));
            return currPrice;
        }).catch(function(error) {
          //if there is an error in the api request, use the price from the prior request
            console.log(error);
            return currPrice;
        });
    };
    //api request to get historical data
    obj.getHistoricalData = function() {
        return $http({
            method: 'GET',
            url: '/api/history'
        }).then(function(response) {
            //covert prices from database to javascript date objects
            response.data.forEach(function(item) {
                item.price_date = new Date(item.price_date);
            });
            //store all response data in factory variable
            historicalData = response.data;
            //isolate the subsection of the dates since the user account creation
            histSubArray= historicalData.slice(historicalData.findIndex(function(object){
                return user.accountDate.getFullYear() === object.price_date.getFullYear() && user.accountDate.getMonth() === object.price_date.getMonth() && user.accountDate.getDate() === object.price_date.getDate();
            }));
            //populate historical prices in the same fashion as cash/coins from before (pulling them from the last transaction of the day if there are transactions for that day)
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
                //only, if there isn't a transaction for that day, pull the historical price from the historical data
                var histRecord = histSubArray.find(function(object) {
                  return user.personalHistory.dates[i].getFullYear() === object.price_date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.price_date.getMonth() && user.personalHistory.dates[i].getDate() === object.price_date.getDate();
                });
                user.personalHistory.historical.push(histRecord.price);
              }
            }
            //calculate personal history values for each day
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
