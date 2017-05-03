(function () {
    'use strict';

    angular.module('csApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'treeConfig'];
    function config($stateProvider, $urlRouterProvider, treeConfig) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html'
            });

        treeConfig.defaultCollapsed = true; // collapse nodes by default
        treeConfig.appendChildOnHover = true; // append dragged nodes as children by default
    }
})();