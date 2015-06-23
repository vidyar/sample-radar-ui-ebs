var app = angular.module('radar', []);

app.controller('mainCtrl', function($scope, Factory) {
  $scope.message = {'type':'info'};
  $scope.repo = 'shippable/support';
  $scope.accessToken = '';
  $scope.days = 0;
  $scope.daysEnd = 5;
  $scope.indexData = {};
  $scope.state = 'submit';
  $scope.loading = false;

  $scope.getIssues = function(state) {
    // console.log($scope.repo,$scope.accessToken,$scope.days,$scope.daysEnd,$scope.state);
    if(checkValid()){
      $scope.loading = true;
      Factory.get($scope.repo,$scope.accessToken,$scope.days,$scope.daysEnd,state)
      .success(function(data) {
        checkState(data.state)
        $scope.indexData = data.indexData;
      })
      .error(function(reason) {
        $scope.loading = false;
        console.log(reason);
      });
    }
  };

  $scope.back = function() {
    $scope.state = 'submit';
    $scope.indexData = {};
    $scope.message = {};
    $scope.loading = false;
  };

  function checkState(state) {
    if(state == 'open' || state == 'closed'){
      $scope.state = state;
    }
    else{
      if (state == 'accessError'){
        $scope.message = {'type':'error','text':'Please check your access token!'};
      }
      else if (state == 'repoError'){
        $scope.message = {'type':'error','text':'Invalid repo!'};
      }
      else{
        console.log(state);
        $scope.message = {'type':'error','text':'Unknown error'};
      }
      $scope.state = 'submit';
      $scope.loading = false;
    }
  };

  function checkValid() {
    if ($scope.accessToken === '') {
      $scope.message = {'type':'error','text':'Please give your access token!'};
      return false;
    }
    else if(isNaN(parseInt($scope.days)) || isNaN(parseInt($scope.daysEnd)) ||
      $scope.daysEnd - $scope.days < 0 ||
      $scope.days < 0 || $scope.daysEnd <  0||
      $scope.days % 1 !== 0 || $scope.daysEnd % 1 !== 0){
        $scope.message = {'type':'error','text':'Please put a valid range of days!'};
        return false;
    }
    else{
      return true;
    }
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