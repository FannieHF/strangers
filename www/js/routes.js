angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
 .state('tabsController', {
    url: '/main',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('helloWorld', {
    url: '/index',
    templateUrl: 'templates/helloWorld.html',
    controller: 'helloWorldCtrl'
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('tabsController.newChallenge', {
    url: '/newChallenge',
    views: {
      'tab2': {
        templateUrl: 'templates/newChallenge.html',
        controller: 'newChallengeCtrl'
      }
    }
  })

  .state('tabsController.mission', {
    url: '/mission',
    views: {
      'tab2': {
        templateUrl: 'templates/mission.html',
        controller: 'missionCtrl'
      }
    }
  })

  .state('tabsController.leaderboard', {
    url: '/leader',
    views: {
      'tab2': {
        templateUrl: 'templates/leaderboard.html',
        controller: 'leaderboardCtrl'
      }
    }
  })

  .state('tabsController.missionComplete', {
    url: '/missionComplete',
    views: {
      'tab2': {
        templateUrl: 'templates/missionComplete.html',
        controller: 'missionCompleteCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab2': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  
  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab1': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  
  .state('tabsController.friendRequest', {
    url: '/friendRequest',
    views: {
      'tab2': {
        templateUrl: 'templates/friendRequest.html',
        controller: 'friendRequestCtrl'
      }
    }
  })
  
.state('tabsController.friends', {
    url: '/friends',
    views: {
      'tab3': {
        templateUrl: 'templates/friends.html',
        controller: 'friendCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/index')

  

});
