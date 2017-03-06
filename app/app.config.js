(function () {
    'use strict';

    angular.module('csApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'treeConfig'];
    function config($stateProvider, $urlRouterProvider, treeConfig) {

        $urlRouterProvider.otherwise('/view');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html'
            })
            .state('view', {
                url: '/view',
                templateUrl: 'view/view.html'
            });

        treeConfig.defaultCollapsed = true; // collapse nodes by default
        treeConfig.appendChildOnHover = true; // append dragged nodes as children by default
    }
})();