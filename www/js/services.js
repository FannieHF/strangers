angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('shareUser2ID', [function($q){
    
    var listeners = [];
    var user2ID = '';

        return {
            getUser2ID: function () {
                return user2ID;
            },
            setUser2ID: function(value) {
                user2ID = value;
            }
            registerlistener: function(listener) {
            	listeners.push(listener);
            }
            refreshUser2Invite: function() {

            	var deferred = $q.defer();

			    var Invite = firebase.database().ref('users/' + $scope.uid + '/Invite');
			    Invite.once('value', function(snapshot) {
			    	console.log('resolving promise with ' + snapshot.val());
			        deferred.resolve = snapshot.val();
			    });

			    return deferred.promise;
            }
        };
}]);