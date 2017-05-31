var app = angular.module('coinMod');
app.factory('apiFactory', function($http) {
    var obj = {};
    var historicalData;
    var histSubArray = [];
    var currPrice;
    var user;
    //method to populate user.peronalHistory with dates, display dates, cash amounts, and coin amounts based on user account information and transaction history
    obj.populatePersonalHistory = function() {
        user.personalHistory = {
            dates: [],
            displayDates: [],
            cash: [],
            coins: [],
            historical: [],
            values: []
        };
        //fix dates for timezone issue

        var firstDate = new Date(user.accountDate);
        var firstDate = new Date(firstDate.setDate(firstDate.getDate() - 1));
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
              user.personalHistory.cash.paush(tempHolder[tempHolder.length - 1].cash);
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
                  return user.personalHisatory.dates[i].getFullYear() === object.date.getFullYear() && user.personalHistory.dates[i].getMonth() === object.date.getMonth() && user.personalHistory.dates[i].getDate() === object.date.getDate();
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
    obj.getCurrentAssets = function() {
        return user.assets;
    };
    obj.getPersonalHistoryDates = function() {
        return user.personalHistory.displayDates;
    };
    obj.getPersonalHistoryValues = function() {
        return user.personalHistory.values;
    };
    obj.getTransactionData = function() {
       return user.transactions;
   };
   obj.getUserInfo = function() {
      return user;
  };
    //buy coin function that logs transaction
    obj.buyCoin = function(numBuy) {
        var newTransaction = {
          date: new Date(),
          coinChange: numBuy,
          numCoins: user.transactions[user.transactions.length - 1].numCoins + numBuy,
          type: 'Bought',
          price: currPrice,
          cash: user.transactions[user.transactions.length - 1].cash - (numBuy * currPrice)
        };
        newTransaction.displayDate = newTransaction.date.toISOString().substring(0,10)
        user.transactions.push(newTransaction);
        user.populateAssets();
        //put request to update user data in server when transaction is made
        $http({
          method: 'PUT',
          url: '/api/user',
          data: user
        }).then(function (response) {
          console.log('Database updated for new transaction');
        }).catch(function (error) {
          console.log(error);
        });
        return user.assets;
    };
    //same as above but for sell
    obj.sellCoin = function(numSell) {
        var newTransaction = {
          date: new Date(),
          coinChange: -numSell,
          numCoins: user.transactions[user.transactions.length - 1].numCoins - numSell,
          type: 'Sold',
          price: currPrice,
          cash: user.transactions[user.transactions.length - 1].cash + (numSell * currPrice)
        };
        newTransaction.displayDate = newTransaction.date.toISOString().substring(0,10)
        user.transactions.push(newTransaction);
        user.populateAssets();
        $http({
          method: 'PUT',
          url: '/api/user',
          data: user
        }).then(function (response) {
          console.log('Database updated for new transaction');
        }).catch(function (error) {
          console.log(error);
        });
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
    //api request to get user information
    obj.getUser = function () {
      return $http({
        method: 'GET',
        url: '/api/user'
      }).then(function (response) {
        //store user data in factory user object
        user = JSON.parse(response.data[0].everything);
        //convert stored date unix numbers to javascript date objects for accountDate and transaction dates
        user.accountDate = new Date(user.accountDate);
        user.transactions.forEach(function (item) {
          item.date = new Date(item.date);
        });
        //delete personalHistory object from user object so it can be repopulated with new historical data
        delete user.personalHistory;
        //populates assets property based on most recent transaction
        user.populateAssets = function () {
          this.assets[0] = this.transactions[this.transactions.length - 1].cash;
          this.assets[1] = this.transactions[this.transactions.length - 1].numCoins;
        };
        //populate assets after user information is loaded
        user.populateAssets();
        //populate personal history after user information is loaded
        obj.populatePersonalHistory();
      }).catch(function (error) {
        console.log(error);
      });
    };
    return obj;

});
