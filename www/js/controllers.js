angular.module('app.controllers', ['cordovaGeolocationModule'])

     
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
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
	$scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    // // Get user id
    // var user = firebase.auth().currentUser;
    var user = firebase.auth().currentUser;
   	$scope.uid = user.uid;

    // if (user != null) {
    //   $scope.uid = user;
    // }


    // Get a reference to the database service
    var database = firebase.database();

    // Get user profile info
    var Points = firebase.database().ref('users/' + $scope.uid + '/Points');
    Points.on('value', function(snapshot) {
        $scope.safeApply($scope.Points = snapshot.val());
    });

}])
   
.controller('missionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	//if p1 == p2 mission complete, but needs to look through all interactions
	// already have p1, touch would give you p2
	var user1 = firebase.auth().currentUser;
   	var uid1 = user1.uid;

   	var user2 = uid2;

   	if(uid2 == user2ID.getU2ID()){
   		$window.location.href = '#/main/missionComplete';
   	}

   	// if uid1 = toucher.uid2, award points


    
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

	var user = firebase.auth().currentUser;
   	var uid = user.uid;

    var prevScoreLoc = firebase.database().ref('users/' + uid + '/Points');
    prevScoreLoc.once('value', function(snapshot) {
        var prevScore = snapshot.val();
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

.controller('homeCtrl', function ($scope,$stateParams, cordovaGeolocationService) {
        $scope.getCurrentPosition = function () {
        cordovaGeolocationService.getCurrentPosition(successHandler);
    };
    var successHandler = function (position) {
    	alert('homeCtrlfunc');
        $scope.currentPosition = position;
        var latitude = position.coords.latitude;
        $scope.latitude = latitude;
        var longitude = position.coords.longitude;
        var timestamp = position.timestamp;
        alert(latitude + ',' + longitude);
    };
})
   
.controller('profileCtrl', ['$scope','$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams) {
	$scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

	console.log('Starting profile control');
	$scope.Username = 'loading...';

    var user = firebase.auth().currentUser;
    console.log(user);
   	$scope.uid = user.uid;

   	console.log(angular.toJson($scope, true));

    // Get a reference to the database service
    var database = firebase.database();

    // Get user profile info
    var FirstName = firebase.database().ref('users/' + $scope.uid + '/FirstName');
    FirstName.once('value', function(snapshot) {
        $scope.safeApply($scope.FirstName = snapshot.val());
    });

    var LastName = firebase.database().ref('users/' + $scope.uid + '/LastName');
    LastName.on('value', function(snapshot) {
        $scope.safeApply($scope.LastName = snapshot.val());
    });

    var Username = firebase.database().ref('users/' + $scope.uid + '/Username');
    Username.on('value', function(snapshot) {
        $scope.safeApply($scope.Username = snapshot.val());
    });

    var ProfilePicture = firebase.database().ref('users/' + $scope.uid + '/ProfilePicture');
    ProfilePicture.on('value', function(snapshot) {
        $scope.safeApply($scope.ProfilePicture = snapshot.val());
    });

    var Points = firebase.database().ref('users/' + $scope.uid + '/Points');
    Points.on('value', function(snapshot) {
        $scope.safeApply($scope.Points = snapshot.val());
    });

    var Rank = firebase.database().ref('users/' + $scope.uid + '/Rank');
    Rank.on('value', function(snapshot) {
        $scope.safeApply($scope.Rank = snapshot.val());
    });

    $scope.logout = function(){
      
       firebase.auth().signOut()
       .then(function(){
           alert("You've been logged out " + $scope.uid);
           $window.location.href = '#/main/login';
       });
    }
    
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

