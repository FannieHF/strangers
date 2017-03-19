angular.module('app.controllers', ['cordovaGeolocationModule'])

     
.controller('menuCtrl', function ($scope, $stateParams, $window, shareUser2ID, cordovaGeolocationService) {

    //Every 10 secs store new user location and search for/challenge nearby users
    var flag = true;

    while(true) {
        if(flag == true) {
            flag = false;
            $timeout( function(){
                
                var user = firebase.auth().currentUser;
                var uid = user.uid;

                // Checks if the user is ready or in a game
                var Status = firebase.database().ref('users/' + uid + '/Status');
                Status.once('value', function(snapshot) {
                    $scope.Status = snapshot.val();
                });

                if($scope.Status == 'Ready') {
                    
                    // Updates user locations
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
                        $scope.timestamp = timestamp;
                    };

                    var updates = {};
                    updates['users/' + uid + '/Lat'] = $scope.latitude;
                    updates['users/' + uid + '/Long'] = $scope.longitude;

                    // Makes the array of users
                    var ref = firebase.database().ref('users');
                    var users = $firebaseArray(ref);

                    users.$loaded()
                    .then(function(){
                        angular.forEach(users, function(user2) {
                            
                            // Get user2 location
                            var uid2 = user2.uid;

                            var Lat2 = firebase.database().ref('users/' + uid2 + '/Lat');
                            Lat2.once('value', function(snapshot) {
                                $scope.Lat2 = snapshot.val();
                            });

                            var Long2 = firebase.database().ref('users/' + uid2 + '/Long');
                            Long2.once('value', function(snapshot) {
                                $scope.Long2 = snapshot.val();
                            });

                            // Finds a nearby valid user
                            var distance = Math.sqrt(Math.pow($scope.latitude - $scope.Lat2, 2) + Math.pow($scope.longitude - $scope.Long2, 2))
                            if(distance < 0.001 && uid != uid2) {

                                var x = Math.floor((Math.random() * 2) + 1);

                                // Assigns each user a random role
                                if(x==1) {
                                    updates['users/' + uid + '/Status'] = 'Detective';
                                    updates['users/' + uid2 + '/Status'] = 'Performer';
                                } else {
                                    updates['users/' + uid + '/Status'] = 'Performer';
                                    updates['users/' + uid2 + '/Status'] = 'Detective';
                                }

                                shareUser2ID.setUser2ID(uid2);

                                // Stops looking for nearby users
                                break;
                            }
                        })
                    });

                    firebase.database().ref().update(updates);

                } else {
                    $window.location.href = '#/newChallenge';
                }

                flag = true;

            }, 10000)
        }
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
   
.controller('newChallengeCtrl', ['$scope', '$stateParams', '$window', 'shareUser2ID', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, shareUser2ID) {

    var stoplimit = 10;

    // Get user id
    var user = firebase.auth().currentUser;
    var uid = user.uid;

    // Get user status info
    var Status = firebase.database().ref('users/' + $scope.uid + '/Status');
    Status.once('value', function(snapshot) {
        $scope.Status = snapshot.val();
    });

    // Get user2 id
    var uid2 = shareUser2ID.getUser2ID();

    // Get user2 status
    var Status2 = firebase.database().ref('users/' + $scope.uid + '/Status');
    Status2.once('value', function(snapshot) {
        $scope.Status2 = snapshot.val();
    });

    // Refreshes user2 invite-status and times out after 10 seconds
    function refreshStuff() {
    console.log('doing le refresh');
    shareUser2ID.refreshUser2Invite().then(function(result) {
        console.log('success ' + result);
        
        // User2 accepts, enter game
        if(result == 'Accept') {
            if($scope.Status == 'Detective') {
                $window.location.href = '#/mission';
            }
            else {
                $window.location.href = '#/mission2';
            }
        }

        // User2 declines, declined page appears and return to Ready
        else if(result == 'Decline') {
            updates['users/' + uid + '/Status'] = 'Ready';
            firebase.database().ref().update(updates);
            $window.location.href = '#/declined'; //____________USE DECLINED PAGE
        }
    });
    if(stoplimit > 0) {
        $timeout(refreshStuff(), 1000);
    }
    stoplimit = stoplimit - 1;
    }
    // Waits for user2 to accept invite
    $scope.accept = function(){
        refreshStuff();
    }

    // On timeout, go to declined page and return to Ready
    updates['users/' + uid + '/Status'] = 'Ready';
    firebase.database().ref().update(updates);
    $window.location.href = '#/declined';

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
function ($scope,$timeout, $window, $stateParams) {
    
    var scoreObtained = 800; // will be some function later; 

    $scope.Score = scoreObtained;

	var user = firebase.auth().currentUser;
   	var uid = user.uid;

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
   
   	// firebase.auth().onAuthStateChanged(function(login){
   	// 	if(login){
   	// 		var user = firebase.auth().currentUser;
   	// 		$scope.uid = user.uid;
   	// 	}
   	// });

    var user = firebase.auth().currentUser;
   	$scope.uid = user.uid;
	

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

    $scope.logout = function(){
      
       firebase.auth().signOut()
       .then(function(){
           alert("You've been logged out " + $scope.uid);
           $window.location.href = '#/main/login';
       })
       .catch(function(error) {
       // Handle Errors here.
           alert("failed to logout" + error.code);
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

