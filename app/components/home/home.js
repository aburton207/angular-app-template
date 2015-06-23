'use strict';

angular.module( 'angularAppTemplateApp.home', [
  //insert dependencies here
    'ngRoute',
	'ngTable'
])

.config(function config( $routeProvider ) {
  $routeProvider
    .when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'components/home/home.html'
      });
})

.controller( 'HomeCtrl', function HomeCtrl( $scope, $filter, NgTableParams ) {
    
 var data = [{name: 'Open and Close Fractures of t1-t6', project: 'A Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'}, 
                        {name: 'Open and Close Fractures of t1-t6', project: 'A Nother Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'},
                        {name: 'A Really Really Long Task Title', project: 'A Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'},
                        {name: 'A Task Title', project: 'A Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'},
						{name: 'Open and Close Fractures of t1-t6', project: 'A Nother Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'},
                        {name: 'A Really Really Long Task Title', project: 'A Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'},
                        {name: 'A Task Title', project: 'A Sample Project Title', modified: '2015-06-12', classification: 'true', feedback: 'true', status: 'Not Started'}
						];
            $scope.tableParams = new NgTableParams({
                project: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                                        $filter('orderBy')(data, params.orderBy()) :
                                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });