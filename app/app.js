var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'UserApp']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      title: 'Home',
      templateUrl: 'partials/home.html',
      public: true
    });
    $routeProvider.when('/home', {
      title: 'Home',
      templateUrl: 'partials/home.html',
      public: true
    });
    $routeProvider.when('/products', {
      title: 'Products',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      login: true
    });
    $routeProvider.when('/signup', {
      templateUrl: 'partials/signup.html',
      public: true
    });
    $routeProvider.when('/verify-email', {
      templateUrl: 'partials/verify-email.html',
      verify_email: true
    });
    $routeProvider.when('/reset-password', {
      templateUrl: 'partials/reset-password.html',
      public: true
    });
    $routeProvider.when('/set-password', {
      templateUrl: 'partials/set-password.html',
      set_password: true
    });
    $routeProvider.otherwise({
      redirectTo: '/home'
    });

  }
]);

app.run(function($rootScope, user) {
  user.init({
    appId: '551b13a6b9489'
  });
});