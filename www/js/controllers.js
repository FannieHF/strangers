angular.module('app.controllers', ['cordovaGeolocationModule'])

     
.controller('menuCtrl', function ($scope, $stateParams, cordovaGeolocationService) {

    //Every minute store new user location
    var flag = true;

    while(flag) {
        flag = false;
        $timeout( function(){
                
                $scope.getCurrentPosition = function () {
                    cordovaGeolocationService.getCurrentPosition(successHandler);
                };
                var successHandler = function (position) {
                    $scope.currentPosition = position;
                    var latitude = position.coords.latitude;
                    $scope.latitude = latitude;
                    var longitude = position.coords.longitude;
                    $scope.longitude = longitude;
                    var timestamp = position.timestamp;
                };

                var uid = '4D5cqPZOkBROEXxOTAjEOxhkr6C3'; //michael

                var updates = {};
                updates['users/' + uid + '/Lat'] = $scope.latitude;
                updates['users/' + uid + '/Long'] = $scope.longitude;

                firebase.database().ref().update(updates);
                flag = true;
        }, 5000)
    }

})
   
.controller('helloWorldCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signUpCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('newChallengeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    // // Get user id
    // var user = firebase.auth().currentUser;
    $scope.uid = '4D5cqPZOkBROEXxOTAjEOxhkr6C3';

    // if (user != null) {
    //   $scope.uid = user;
    // }


    // Get a reference to the database service
    var database = firebase.database();

    // Get user profile info
    var Points = firebase.database().ref('users/' + $scope.uid + '/Points');
    Points.on('value', function(snapshot) {
        $scope.Points = snapshot.val();
    });

}])
   
.controller('missionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    
}])
   
.controller('leaderboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])
   
.controller('missionCompleteCtrl', ['$scope','$timeout','$window','$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$timeout, $window,$stateParams) {
    
    var scoreObtained = 800; // will be some function later; 

    $scope.Score = scoreObtained;

    var uid = '4D5cqPZOkBROEXxOTAjEOxhkr6C3'; //michael

    var prevScore = 50;

    var prevScoreLoc = firebase.database().ref('users/' + uid + '/Points');
    prevScoreLoc.once('value', function(snapshot) {
        prevScore = snapshot.val();
        var newScore = prevScore + scoreObtained;
        var updates = {};
        updates['users/' + uid + '/Points'] = newScore;

        firebase.database().ref().update(updates);
    });
    
    //8 seconds delay
    $timeout( function(){
        $window.location.href = '#/friendRequest';
    }, 8000)
}])

.controller('loginCtrl', ['$scope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $window) {
    $scope.data = {};

    $scope.login = function(){
      
       firebase.auth().signInWithEmailAndPassword($scope.data.Email, $scope.data.Password)
       .then(function(firebaseUser){
           $window.location.href = '#/main/home';
       })
       .catch(function(error) {
       // Handle Errors here.
           alert(error.code);
           $window.location.href = '#/main/login';
       });
    }
}])

.controller('homeCtrl', function ($scope, $stateParams, cordovaGeolocationService) {
        $scope.getCurrentPosition = function () {
        cordovaGeolocationService.getCurrentPosition(successHandler);
    };
    var successHandler = function (position) {
        $scope.currentPosition = position;
        var latitude = position.coords.latitude;
        $scope.latitude = latitude;
        var longitude = position.coords.longitude;
        var timestamp = position.timestamp;
    };
})
   
.controller('profileCtrl', ['$scope','$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams) {
   
    // // Get user id
    // var user = firebase.auth().currentUser;
    $scope.uid = '4D5cqPZOkBROEXxOTAjEOxhkr6C3'; //michael

    // Get a reference to the database service
    var database = firebase.database();

    // Get user profile info
    var FirstName = firebase.database().ref('users/' + $scope.uid + '/FirstName');
    FirstName.on('value', function(snapshot) {
        $scope.FirstName = snapshot.val();
    });

    var LastName = firebase.database().ref('users/' + $scope.uid + '/LastName');
    LastName.on('value', function(snapshot) {
        $scope.LastName = snapshot.val();
    });

    var Username = firebase.database().ref('users/' + $scope.uid + '/Username');
    Username.on('value', function(snapshot) {
        $scope.Username = snapshot.val();
    });

    var ProfilePicture = firebase.database().ref('users/' + $scope.uid + '/ProfilePicture');
    ProfilePicture.on('value', function(snapshot) {
        $scope.ProfilePicture = snapshot.val();
    });

    var Points = firebase.database().ref('users/' + $scope.uid + '/Points');
    Points.on('value', function(snapshot) {
        $scope.Points = snapshot.val();
    });

    var Rank = firebase.database().ref('users/' + $scope.uid + '/Rank');
    Rank.on('value', function(snapshot) {
        $scope.Rank = snapshot.val();
    });
    
}])


.controller('friendRequestCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])
   
.controller('searchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

