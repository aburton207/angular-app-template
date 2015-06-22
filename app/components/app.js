'use strict';

/**
 * @ngdoc overview
 * @name angularAppTemplateApp
 * @description
 * # angularAppTemplateApp
 *
 * Main module of the application.
 */
angular
    .module('angularAppTemplateApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'LocalStorageModule',
	
	
	'mgcrea.ngStrap',
    //Insert any created modules here. Ideally one per major feature.
    'angularAppTemplateApp.home',
    'angularAppTemplateApp.about'
    ])
    .config(function ($routeProvider) {
    var imsUrl = 'https://dev-ims.ihtsdotools.org/#/';
    var imsUrlParams = '?serviceReferer=' + window.location.href;
    $routeProvider
        .when('/login', {
            redirectTo: function(){ window.location = decodeURIComponent(imsUrl + 'login' + imsUrlParams);}
          })
        .when('/logout', {
            redirectTo: function(){ window.location = imsUrl + 'logout' + imsUrlParams;}
          })
        .when('/settings', {
            redirectTo: function(){ window.location = imsUrl + 'settings' + imsUrlParams;}
          })
        .when('/register', {
            redirectTo: function(){ window.location = imsUrl + 'register' + imsUrlParams;}
          })
          .otherwise({
            redirectTo: '/home'
          });
    })
    .run( function run () {
    })
  .controller( 'AppCtrl', function AppCtrl ($scope, $animate, localStorageService, todoService, $alert, $timeout){

  if (typeof(browser_old) == "undefined"){
    initRipplesWithArrive();

    $(document).arrive('.navbar-toggle', function() {
      $(this).sideNav({menuWidth: 260, closeOnClick: true});
    });
  }

  $scope.theme_colors = [
    'blue',
    'light-blue'
  ];

  // Add todoService to scope
  service = new todoService($scope);
  $scope.todosCount = service.count();
  $scope.$on('todos:count', function(event, count) {
    $scope.todosCount = count;
    element = angular.element('#todosCount');

    if ( !element.hasClass('animated') ){
      $animate.addClass(element, 'animated bounce', function() {
        $animate.removeClass(element, 'animated bounce');
      });
    }
  });

  $scope.fillinContent = function(){
    $scope.htmlContent = 'content content';
  };

  // theme changing

  $scope.changeTemplateTheme = function(cls){
    $scope.theme.template = cls;
  };

  if ( !localStorageService.get('theme') ) {
    theme = {
      color: 'theme-blue',
      template: 'theme-template-dark'
    };
    localStorageService.set('theme', theme);
  }
  localStorageService.bind($scope, 'theme');

  var introductionAlert = $alert({
    title: 'Welcome to IHTSDO Patterns Library',
    content: 'This is a ux demo',
    placement: 'top',
    type: 'theme',
    show: false,
    template: 'assets/tpl/partials/alert-introduction.html',
    animation: 'mat-grow-top-right'
  });

  if(!localStorageService.get('alert-introduction')) {
    $timeout(function(){
      $scope.showIntroduction();
      localStorageService.set('alert-introduction', 1);
    }, 1750);
  }

  $scope.showIntroduction = function(){
    introductionAlert.show();
  };




});
