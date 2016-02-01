(function () {
    'use strict';

    angular.module('myApp').factory('UtilityService', UtilityService);

    function UtilityService() {
        var factory = {
            ParseJsonDate: ParseJsonDate
        };

        function ParseJsonDate(jsonDateString) {
            return new Date(parseInt(jsonDateString.replace('/Date(', '')));
        }

        return factory;
    }
})();