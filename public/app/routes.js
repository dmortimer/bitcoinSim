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
              templateUrl: 'views/info.html',
              //sets info view to default to the total view
              redirectTo: 'info.total'
            })
            .state('info.weekly', {
              url: '/weekly',
              views: {
                '':{
              templateUrl: 'views/info.weekly.html'
                }
              }
            })
            .state('info.monthly', {
              url: '/monthly',
              views: {
                '':{
              templateUrl: 'views/info.monthly.html'
                }
              }
            })
            .state('info.yearly', {
              url: '/yearly',
              views: {
                '':{
              templateUrl: 'views/info.yearly.html'
                }
              }
            })
            .state('info.total', {
              url: '/total',
              views: {
                '':{
              templateUrl: 'views/info.total.html'
              }
            }
          });
          //sets application to default to signin page on load or any invalid route
          $urlRouterProvider.otherwise('signin');
});
