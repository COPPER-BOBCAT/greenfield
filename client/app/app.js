angular.module('pledgr', [
  'pledgr.charities',
  'pledgr.factories',
  'pledgr.home',
  'pledgr.signup',
  'pledgr.signin',
  'pledgr.register',
  'pledgr.creditcard',
  'pledgr.account',
  'pledgr.charityDash',
  'pledgr.donate',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
//.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/signin/signin.html',
      controller: 'SignInController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/register/register.html',
      controller: 'RegisterController'
    })
    .state('charities', {
       url: '/charities/{c1:[0-9]+}/{c2:[0-9]+}/{c3:[0-9]+}',
       templateUrl: 'app/charities/charities.html',
       controller: 'CharitiesController'
    })
    .state('charityDash', {
       url: '/charityDash',
       templateUrl: 'app/charityDash/charityDash.html',
       controller: 'CharityDashController'
    })
    .state('creditcard', {
       url: '/manageCards',
       templateUrl: 'app/creditcard/creditcard.html',
       controller: 'CreditCardController'
    })
    .state('account', {
       url: '/account',
       templateUrl: 'app/account/account.html',
       controller: 'AccountController'
    })
    .state('confirmation', {
      url: '/confirmation',
      templateUrl: 'app/confirmation/confirmation.html',
    }).state('donate', {
      url: '/donate/:id',
      templateUrl: 'app/donate/donate.html',
      controller: 'DonateController'
    });

    // $httpProvider.interceptors.push('AttachTokens');
}).controller('mainApp', function($scope, $state, $window){

  $scope.state = $state;
  
  $scope.logout = function(){
    delete $window.localStorage['token'];
    $state.go('signin');
  }

});
