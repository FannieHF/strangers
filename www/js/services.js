angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('user2ID', [function(){

	var user2ID = '';

		return{
			getU2ID: function(){
				return user2ID;
			},

			setU2ID: function(value){
				user2ID = value;
			}
		}

}]);