(function(){
  var app = angular.module('coinMod', ["ngRoute"]);

  app.config(function($routeProvider){

    $routeProvider.when("/",{
      templateUrl: 'views/dashboard.html'
    })
    .when("/info",{
      templateUrl: 'views/info.html'
    })
    .when("/signin",{
      templateUrl: 'views/signin.html'
    });

  });
})();
