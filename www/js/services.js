angular.module('app.services', [])

.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth){
    var ref = new Firebase("https://yourtester.firebaseio.com");
    return $firebaseAuth(ref);
  }

}])

.service('BlankService', [function(){

}]);