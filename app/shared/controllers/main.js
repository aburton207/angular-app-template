angular.module('angularAppTemplateApp')
.controller('MainController',
  ['$scope', '$animate', 'localStorageService', '$alert', '$timeout',
  function($scope, $animate, localStorageService, $alert, $timeout){


  $scope.theme_colors = [
    'blue',
    'light-blue'
  ];



  // theme changing
  $scope.changeColorTheme = function(cls){
    $scope.theme.color = cls;
  };

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
    template: 'shared/partials/alert-introduction.html',
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




}]);
