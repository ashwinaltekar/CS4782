(function () {
    'use strict';
    angular.module('csApp').service('LoginService', login);

    login.$inject = ['$http', '$q'];
    function login($http, $q) {
        return {
            authenticate: authenticate,
            getFrameworkDetails: getFrameworkDetails
        };

        function authenticate(form) {
            var deferred = $q.defer();
            return $http.post("http://localhost:3000/api/login/" + angular.toJson(form))
                .then(callSuccess)
                .catch(callError);

            function callSuccess(response) {
                console.log(response);
                deferred.resolve(response.data);
                return deferred.promise;
            }
            function callError() {
                deferred.reject("Error logging in.");
                return deferred.promise;
            }
        }

        function getFrameworkDetails(frameworkName) {
            var deferred = $q.defer();
            return $http.get("http://localhost:3000/api/frameworks/" + frameworkName)
                .then(callSuccess)
                .catch(callError);

            function callSuccess(response) {
                deferred.resolve(response.data);

                return deferred.promise;
            }
            function callError() {
                deferred.reject("Error getting framework details.");
                return deferred.promise;
            }
        }
    }
})();