var originalOnePerDay = [{
  date: new Date(2017, 0, 1, 9, 30, 32, 0),
  coinChange: 0,
  numCoins: 0,
  cash: 30000
},
{
    date: new Date(2017, 0, 4, 8, 30, 32, 0),
    coinChange: 3,
    numCoins: 3,
    cash: 26944.5
},
{
    date: new Date(2017, 0, 16, 8, 30, 32, 0),
    coinChange: -2,
    numCoins: 1,
    cash: 28581.76
},
{
    date: new Date(2017, 2, 2, 8, 30, 32, 0),
    coinChange: 4,
    numCoins: 5,
    cash: 23538.08
},
{
    date: new Date(2017, 2, 17, 8, 30, 32, 0),
    coinChange: -5,
    numCoins: 0,
    cash: 29402.58
},
{
    date: new Date(2017, 3, 26, 8, 30, 32, 0),
    coinChange: 2,
    numCoins: 2,
    cash: 26832.9
}];

var multiplePerDay = [{
    username: 'testuser',
    password: '12345',
    name: 'Jane Doe',
    email: 'janedoe@test.com',
    startingCash: 30000,
    startingCoins: 0,
    assets: [],
    accountDate: new Date(2017, 0, 0, 8, 30, 32, 0),
    transactions: [
      //note that all transaction dates need to have an added 1 day to compensate for timezone BS
      {
        date: new Date(2017, 0, 1, 9, 30, 32, 0),
        displayDate: '2017-01-01',
        coinChange: 0,
        numCoins: 0,
        type: 'Account Created',
        price: 997.6888,
        cash: 30000
      },
      {
          date: new Date(2017, 0, 1, 9, 33, 32, 0),
          displayDate: '2017-01-01',
          coinChange: 3,
          numCoins: 3,
          type: 'Bought',
          price: 997.6888,
          cash: 27006.9336
      },
      {
          date: new Date(2017, 0, 1, 10, 30, 32, 0),
          displayDate: '2017-01-01',
          coinChange: -2,
          numCoins: 1,
          type: 'Sold',
          price: 997.6888,
          cash: 29002.3112
      },
      {
          date: new Date(2017, 2, 2, 8, 30, 32, 0),
          displayDate: '2017-03-02',
          coinChange: 4,
          numCoins: 5,
          type: 'Bought',
          price: 1260.924,
          cash: 23958.6152
      },
      {
          date: new Date(2017, 2, 2, 8, 30, 33, 0),
          displayDate: '2017-03-02',
          coinChange: -5,
          numCoins: 0,
          type: 'Sold',
          price: 1260.924,
          cash: 30263.2352
      },
      {
          date: new Date(2017, 3, 26, 8, 30, 32, 0),
          displayDate: '2017-04-26',
          coinChange: 2,
          numCoins: 2,
          type: 'Bought',
          price: 1284.845,
          cash: 27693.5452
      },
      {
          date: new Date(2017, 3, 27, 8, 30, 32, 0),
          displayDate: '2017-04-27',
          coinChange: 2,
          numCoins: 4,
          type: 'Bought',
          price: 1329.19,
          cash: 25035.1652
      },
      {
          date: new Date(2017, 3, 27, 8, 30, 40, 0),
          displayDate: '2017-04-27',
          coinChange: -2,
          numCoins: 2,
          type: 'Sold',
          price: 1329.19,
          cash: 27693.5452
      },
      {
          date: new Date(2017, 3, 27, 8, 30, 45, 0),
          displayDate: '2017-04-27',
          coinChange: -2,
          numCoins: 0,
          type: 'Sold',
          price: 1329.19,
          cash: 30351.9252
      },
      {
          date: new Date(2017, 3, 27, 8, 30, 59, 0),
          displayDate: '2017-04-27',
          coinChange: 10,
          numCoins: 10,
          type: 'Bought',
          price: 1329.19,
          cash: 17060.0252
      }
    ]
}];

var newUser = {
    username: undefined,
    password: undefined,
    name: undefined,
    email: undefined,
    startingCash: 30000,
    startingCoins: 0,
    assets: [],
    accountDate: undefined,
    transactions: [
      {
        date: undefined,
        displayDate: undefined,
        coinChange: 0,
        numCoins: 0,
        type: 'Account Created',
        price: undefined,
        cash: 30000
      }
    ]
};
