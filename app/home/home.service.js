(function () {
    'use strict';
    angular.module('csApp').service('HomeService', home);

    home.$inject = ['$http', '$q'];
    function home($http, $q) {
        var self = this;

        return {
            get: get
        };

        function get() {
            var deferred = $q.defer();
            return $http.get("asset/NIST-CSF.json")
                .then(callSuccess)
                .catch(callError);

            function callSuccess(response) {
                deferred.resolve(response.data);
                return deferred.promise;
            }
            function callError() {
                deferred.reject("Error getting data.");
                return deferred.promise;
            }
        }
    }
})();