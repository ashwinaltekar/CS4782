(function () {
    'use strict';

    angular.module('csApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html'
            })
            .state('view2', {
                url: '/view2',
                templateUrl: 'view2/view2.html'
            });
    }
})();