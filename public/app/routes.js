var app = angular.module('coinMod');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider.state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html'
            })
            .state('signin',{
              url: '/signin',
              templateUrl: 'views/signin.html'
            })
            .state('info', {
              url: '/info',
              templateUrl: 'views/info.html'
            });
});










// app.config(function($routeProvider){
//
//   $routeProvider.when("/",{
//     templateUrl: 'views/dashboard.html',
//     controller: 'apiController'
//   })
//   .when("/info",{
//     templateUrl: 'views/info.html',
//     controller: 'hgraphController'
//   })
//   .when("/signin",{
//     templateUrl: 'views/signin.html',
//     controller: 'apiController'
//   });
//
// });
