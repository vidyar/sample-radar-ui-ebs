var app = angular.module('radar', []);

app.controller('mainCtrl', function($scope, Factory) {
  $scope.message;
  $scope.repo = 'shippable/support';
  $scope.accessToken;
  $scope.days = 0;
  $scope.daysEnd = 5;

  $scope.getIssues = function(state) {
    console.log($scope.repo,$scope.accessToken,$scope.days,$scope.daysEnd,state);
    Factory.get($scope.repo,$scope.accessToken,$scope.days,$scope.daysEnd,state)
    .success(function(data) {
      alert(data);
    })
    .error(function(reason) {
      console.log(reason);
    });
  };
});


app.factory('Factory', function($http){
  BASE_URL = "http://localhost:3001";
  return {
    get: function(repo,token,days,daysEnd,state) {
      return $http.get(BASE_URL + 
        '/issues?&repo=' + repo +
        '&token=' + token +
        '&days=' + days +
        '&daysEnd=' + daysEnd +
        '&state=' + state);
    }
  };
});