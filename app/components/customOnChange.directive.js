(function () {
    'use strict';

    angular.module('csApp').directive('customOnChange', onChange);

    function onChange() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    }
})();