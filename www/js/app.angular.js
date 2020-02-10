var angularApp = angular.module('angularApp', []);

angularApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

angularApp.controller('IndexController', function StoriesController($scope, $http) {
    var numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var rows = [];
    var columns = [];
    var models = {}

    $scope.shouldShow = function() {
        return Math.floor((Math.random() * 100) + 1) > 10;
    }
    
    numbers.forEach(function(number){
        rows.push({value: number, highlight: false});
        columns.push({value: number, highlight: false});
        numbers.forEach(function(otherNumber){
            var shouldShow = $scope.shouldShow()
            models['result-'+number+'-'+otherNumber] = {shouldShow: shouldShow, value: shouldShow ? number * otherNumber : ''}
        });
    });

    $scope.models = models;
    $scope.rows = rows;
    $scope.columns = columns;


    $scope.checkResult = function(row, column) {
        console.log(row, column)
        var model = $scope.models['result-'+row+'-'+column];
        console.log(model+'='+row+'*'+column)
        console.log(model == row * column)
    }

    $scope.highligthValues = function(column, row) {
        for(i=0;i<$scope.rows.length;++i){
            $scope.rows[i].highlight = ($scope.rows[i].value == row.value);
        }
        for(i=0;i<$scope.columns.length;++i){
            $scope.columns[i].highlight = ($scope.columns[i].value == column.value);
        }
    }

    $scope.$watch($scope.rows)
    $scope.$watch($scope.columns)
});
